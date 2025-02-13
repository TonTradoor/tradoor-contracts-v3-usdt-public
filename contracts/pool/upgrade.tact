import "@stdlib/ownable";

message UpdateContract {
    code: Slice;
    data: Slice?;
}

asm fun nativeSetCode(newCode: Cell) { SETCODE }
asm fun nativeSetData(newData: Cell) { c4 POP }

trait Upgradable with Ownable {
    owner: Address;

    receive(msg: UpdateContract) {
        self.requireOwner();
        nativeSetCode(beginCell().storeSlice(msg.code).endCell());
        if (msg.data != null) {
            nativeSetData(beginCell().storeSlice(msg.data!!).endCell())
        }
    }
}

