import "@stdlib/deploy";
import "./messages";
import "./events";
import "./structs";

contract Pool with Deployable {

    /// RBF
    // index => order
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>;
    increaseRBFPositionIndex: Int as uint128;
    increaseRBFPositionIndexNext: Int as uint128;
    // index => order
    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>;
    decreaseRBFPositionIndex: Int as uint128;
    decreaseRBFPositionIndexNext: Int as uint128;

    globalRBFPosition: GlobalRBFPosition;
    // user => RBF
    fundPositions: map<Address, RBFPosition>;

    /// LP
    // index => order
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>;
    increaseLPPositionIndex: Int as uint128;
    increaseLPPositionIndexNext: Int as uint128;
    // index => order
    decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>;
    decreaseLPPositionIndex: Int as uint128;
    decreaseLPPositionIndexNext: Int as uint128;

    globalLiquidity: Int as uint256;
    // token => globalLP
    globalLPPosition: map<Address, GlobalLPPosition>;
    // user => LP
    lpPositions: map<Address, LPPosition>;

    /// Perp


    init() {
        self.increaseRBFPositionIndex = 0;
        self.increaseRBFPositionIndexNext = 0;
        self.decreaseRBFPositionIndex = 0;
        self.decreaseRBFPositionIndexNext = 0;
        self.globalRBFPosition = GlobalRBFPosition{riskBufferFund: 0, liquidity: 0};

        self.increaseLPPositionIndex = 0;
        self.increaseLPPositionIndexNext = 0;
        self.decreaseLPPositionIndex = 0;
        self.decreaseLPPositionIndexNext = 0;

        self.globalLiquidity = 0;
    }

    // ============================ RBF ================================ //
    receive(msg: CreateIncreaseRBFPosition) {

    }

    receive(msg: CancelIncreaseRBFPosition) {
        
    }

    receive(msg: ExecuteIncreaseRBFPosition) {
        
    }

    receive(msg: CreateDecreaseRBFPosition) {
        
    }

    receive(msg: CancelDecreaseRBFPosition) {
        
    }

    receive(msg: ExecuteDecreaseRBFPosition) {
        
    }

    // ============================ RBF ================================ //
    receive(msg: CreateIncreaseLPPosition) {
        
    }
    
    receive(msg: CancelIncreaseLPPosition) {
        
    }
    
    receive(msg: ExecuteIncreaseLPPosition) {
        
    }
    
    receive(msg: CreateDecreaseLPPosition) {
        
    }
    
    receive(msg: CancelDecreaseLPPosition) {
        
    }
    
    receive(msg: ExecuteDecreaseLPPosition) {
        
    }

    // ============================ Perp ================================ //



}
