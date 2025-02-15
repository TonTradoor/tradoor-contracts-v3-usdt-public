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

message RequestCreated {
    opAddress: Address;
}

contract MultisigSigner {

    master: Address;

    // Voting state
    members: map<Address, Int>;
    weight: Int = 0;
    requiredWeight: Int;
    completed: Bool;
    
    // Request
    request: Request;

    init(master: Address, members: map<Address, Int>, requiredWeight: Int, request: Request) {
        self.master = master;
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.completed = false;
        self.request = request;
    }

    receive() {
        // Do nothing
    }

    receive("YES") {

        // Checks
        require(self.request.timeout > now(), "Timeout");
        require(!self.completed, "Completed");

        // Load weight
        let sender: Address = sender();
        let weight: Int = self.members.get(sender)!!;
        self.members.set(sender, null);

        // Update weight
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
    seqno: Int;
    members: map<Address, Int>;
    totalWeight: Int;
    requiredWeight: Int;

    init(members: map<Address, Int>, totalWeight: Int, requiredWeight: Int) {
        self.members = members;
        self.requiredWeight = requiredWeight;
        self.totalWeight = totalWeight;
        self.totalWeight = 0;
        self.seqno = 0;
    }

    // Request new pending transaction
    receive(msg: Request) {

        // Check sender
        let sender: Address = sender();
        let weight: Int = self.members.get(sender)!!;
        require(weight > 0, "Not a member");

        // Create message
        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, msg);
        let opAddress: Address = contractAddress(opInit);
        send(SendParameters{
            value: 0, 
            to: opAddress, 
            mode: SendRemainingValue | SendIgnoreErrors,
            bounce: true,
            code: opInit.code,
            data: opInit.data
        });
    }

    receive(msg: Signed) {

        // Check parameters
        let sender: Address = sender();
        let opInit: StateInit = initOf MultisigSigner(myAddress(), self.members, self.requiredWeight, msg.request);
        let opAddress: Address = contractAddress(opInit);
        require(opAddress == sender, "Invalid sender");
        require(msg.request.timeout > now(), "Timeout");

        // Send operation
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