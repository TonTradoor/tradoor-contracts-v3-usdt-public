import "@stdlib/deploy";

message SetManager {
    manager: Address;
}

message Request {
    to: Address;
    timeout: Int as uint32;
    manager: Address;
}

message Signed {
    request: Request;
}

contract MultisigSigner {
    master: Address;

    members: map<Address, Int>;
    weight: Int = 0;
    requiredWeight: Int;
    completed: Bool;
    request: Request;

    init(master: Address, members: map<Address, Int>, requiredWeight: Int, request: Request) {
        self.master = master;
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.completed = false;
        self.request = request;
    }

    receive() { }

    receive("YES") {
        require(self.request.timeout > now(), "Timeout");
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

contract Multisig with Deployable {
    members: map<Address, Int>;
    requiredWeight: Int;

    init(members: map<Address, Int>, requiredWeight: Int) {
        self.members = members;
        self.requiredWeight = requiredWeight;
    }

    receive(msg: Request) {
        require(self.members.exists(sender()), "Not a member");

        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, msg);
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
        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, msg.request);
        let opAddress: Address = contractAddress(opInit);
        require(opAddress == sender, "Invalid sender");
        require(msg.request.timeout > now(), "Timeout");

        send(SendParameters{
            to: msg.request.to,
            value: 0,
            mode: SendRemainingValue | SendIgnoreErrors,
            body: SetManager{ manager: msg.request.manager }.toCell()
        });
    }

    get fun member(address: Address): Int? {
        return self.members.get(address);
    }

    get fun members(): map<Address, Int> {
        return self.members;
    }
}