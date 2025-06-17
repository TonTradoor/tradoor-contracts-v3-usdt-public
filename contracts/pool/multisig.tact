import "@stdlib/deploy";
import "@stdlib/ownable";

message SetManager {
    manager: Address;
    compensator: Address;
    claimer: Address;
}

message LaunchConfig {
    members: map<Address, Int as uint8>;
    requiredWeight: Int as uint8;
    timeout: Int as uint32;
}

message Request {
    to: Address;
    manager: Address;
    compensator: Address;
    claimer: Address;
}

message Signed {
    request: Request;
}

contract MultisigSigner {
    master: Address;

    members: map<Address, Int as uint8>;
    weight: Int as uint8 = 0;
    requiredWeight: Int as uint8;
    completed: Bool;
    request: Request;
    expired: Int as uint32;

    init(master: Address, members: map<Address, Int as uint8>, requiredWeight: Int, timeout: Int, request: Request) {
        self.master = master;
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.completed = false;
        self.expired = now() + timeout;
        self.request = request;
    }

    receive() { }

    receive("YES") {
        require(self.expired > now(), "Timeout");
        require(!self.completed, "Completed");

        let sender: Address = sender();
        let _weight: Int? = self.members.get(sender);
        require(_weight != null, "Not a member");
        let weight: Int = _weight!!;

        self.members.del(sender);

        self.weight = self.weight + weight;
        if (self.weight >= self.requiredWeight) {
            self.completed = true;
            send(SendParameters{
                value: 0,
                to: self.master,
                mode: SendRemainingBalance | SendIgnoreErrors,
                bounce: false,
                body: Signed{ request: self.request }.toCell()
            });
        }
    }

    get fun request(): Request {
        return self.request;
    }
}

contract Multisig with Deployable, Ownable {
    owner: Address;
    members: map<Address, Int as uint8>;
    requiredWeight: Int as uint8;
    timeout: Int as uint32;

    init(members: map<Address, Int as uint8>, requiredWeight: Int, timeout: Int) {
        self.owner = sender();
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.timeout = timeout;
    }

    receive(msg: LaunchConfig) { 
        self.requireOwner();
        self.members = msg.members;
        self.requiredWeight = msg.requiredWeight;
        self.timeout = msg.timeout;
        self.reply("launch config updated".asComment());
    }

    receive(msg: Request) {
        require(self.members.exists(sender()), "Not a member");

        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, self.timeout, msg);
        send(SendParameters{
            value: 0,
            to: contractAddress(opInit),
            mode: SendRemainingValue | SendIgnoreErrors,
            bounce: true,
            code: opInit.code,
            data: opInit.data
        });
    }

    receive(msg: Signed) {
        let sender: Address = sender();
        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, self.timeout, msg.request);
        let opAddress: Address = contractAddress(opInit);
        require(opAddress == sender, "Invalid sender");

        send(SendParameters{
            to: msg.request.to,
            value: 0,
            mode: SendRemainingValue | SendIgnoreErrors,
            body: SetManager{ manager: msg.request.manager, compensator:  msg.request.compensator, claimer:  msg.request.claimer }.toCell()
        });
    }

    get fun member(address: Address): Int? {
        return self.members.get(address);
    }

    get fun members(): map<Address, Int as uint8> {
        return self.members;
    }
}