struct Operation {
    seqno: Int as uint32;
    manager: Address;
}

message ExecuteOperation {
    operation: Operation;
    signature1: Slice; 
    signature2: Slice; 
    signature3: Slice;
}

message OperationExecuted {
    seqno: Int as uint32;
}

trait Multisig {
    seqno: Int;
    required_sinatures: Int;
    user1_key: Int;
    user2_key: Int;
    user3_key: Int;

    receive(msg: ExecuteOperation) {
        require(msg.operation.seqno == self.seqno, "Invalid seqno");

        let op_hash: Int = msg.operation.toCell().hash();
        let ok1: Bool = checkSignature(op_hash, msg.signature1, self.user1_key);
        let ok2: Bool = checkSignature(op_hash, msg.signature2, self.user2_key);
        let ok3: Bool = checkSignature(op_hash, msg.signature3, self.user3_key);

        let sinatures: Int = (ok1 ? 1 : 0) + (ok2 ? 1 : 0) + (ok3 ? 1 : 0);
        require(sinatures >= self.required_sinatures, "Not enough signatures");

        self.setManager(msg.operation);
        self.seqno += 1;
    }

    abstract fun setManager(op: Operation);

    get fun key1(): Int {
        return self.user1_key;
    }

    get fun key2(): Int {
        return self.user2_key;
    }

    get fun key3(): Int {
        return self.user3_key;
    }

    get fun seqno(): Int {
        return self.seqno;
    }
}