import "./jetton_master";
import "./jetton_wallet";
import "@stdlib/deploy";


contract TLPJettonWallet with JettonWallet {
    balance: Int as coins = 0;
    owner: Address;
    jetton_master: Address;

    init(owner: Address, jetton_master: Address) {
        self.owner = owner;
        self.jetton_master = jetton_master;
    }

    override inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf TLPJettonWallet(owner_address, self.jetton_master);
    }
}

contract TLPJettonMaster with JettonMaster, Deployable {
    total_supply: Int as coins = 0;
    mintable: Bool = true;
    owner: Address;
    jetton_content: Cell;

    init(owner: Address, jetton_content: Cell){
        self.owner = owner;
        self.jetton_content = jetton_content;
    }

    receive("Owner: MintClose") {
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Not owner");
        self.mintable = false;
    }

    override inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf TLPJettonWallet(owner_address, myAddress());
    }
} 