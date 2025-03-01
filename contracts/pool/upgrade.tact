import "@stdlib/ownable";

message RequestUpgrade {
    code: Slice;
    data: Slice?;
}

message ExecuteUpgrade {
    seqno: Int as uint32;
}

message CancelUpgrade {
    seqno: Int as uint32;
}

struct UpgradeRequest {
    code: Slice;
    data: Slice?;
    unlockTime: Int as uint32;
}

asm fun nativeSetCode(newCode: Cell) { SETCODE }
asm fun nativeSetData(newData: Cell) { c4 POP }

trait Upgradable with Ownable {
    owner: Address;

    upgradeSeqno: Int;
    upgradeRequests: map<Int, UpgradeRequest>;

    receive (msg: RequestUpgrade) {
        self.requireOwner();
        let request = UpgradeRequest{
            code: msg.code, 
            data: msg.data,
            unlockTime: now() + 3 * 24 * 60 * 60
        };
        let seqno = self.upgradeSeqno;
        self.upgradeSeqno += 1;

        self.upgradeRequests.set(seqno, request);
        self.reply("upgrade requested".asComment());
    }

    receive(msg: ExecuteUpgrade) {
        self.requireOwner();

        let _request: UpgradeRequest? = self.upgradeRequests.get(msg.seqno);
        require(_request != null, "invalid seqno");

        let request: UpgradeRequest = _request!!;
        require(now() >= request.unlockTime, "time lock not expired");

        nativeSetCode(beginCell().storeSlice(request.code).endCell());
        if (request.data != null) {
            nativeSetData(beginCell().storeSlice(request.data!!).endCell())
        }
        self.upgradeRequests.del(msg.seqno);
        self.reply("upgrade executed".asComment());
    }

    receive(msg: CancelUpgrade) {
        self.requireOwner();
        self.upgradeRequests.del(msg.seqno);
        self.reply("upgrade canceled".asComment());
    }

    get fun upgradeUnlockTime(seqno: Int): Int? {
        return self.upgradeRequests.exists(seqno)? self.upgradeRequests.get(seqno)!!.unlockTime : null;
    }

    get fun upgradeSeqno(): Int {
        return self.upgradeSeqno;
    }
}

