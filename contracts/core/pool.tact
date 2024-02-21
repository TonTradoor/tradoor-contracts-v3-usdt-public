import "@stdlib/deploy";
import "./messages";
import "./events";
import "./structs";

contract Pool with Deployable {

    /// config
    tokenIds: map<Int, Bool>; // tokenId => enabled

    /// RBF
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>; // index => order
    increaseRBFPositionIndex: Int as uint128;
    increaseRBFPositionIndexNext: Int as uint128;

    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>; // index => order
    decreaseRBFPositionIndex: Int as uint128;
    decreaseRBFPositionIndexNext: Int as uint128;

    globalRBFPosition: GlobalRBFPosition;
    fundPositions: map<Address, RBFPosition>; // user => RBF

    /// LP
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>; // index => order
    increaseLPPositionIndex: Int as uint128;
    increaseLPPositionIndexNext: Int as uint128;

    decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>; // index => order
    decreaseLPPositionIndex: Int as uint128;
    decreaseLPPositionIndexNext: Int as uint128;

    globalLiquidity: Int as uint256;
    globalLPPosition: map<Int, GlobalLPPosition>; // tokenId => globalLP
    lpPositions: map<Address, LPPosition>; // user => LP

    /// Perp
    // market order
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrders>; // tokenId => index => order
    increasePerpPositionMarketIndex: Int as uint128;
    increasePerpPositionMarketIndexNext: Int as uint128;

    decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrders>; // tokenId => index => order
    decreasePerpPositionMarketIndex: Int as uint128;
    decreasePerpPositionMarketIndexNext: Int as uint128;

    // limit order
    increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrders>; // tokenId => index => order
    increasePerpPositionLimitIndexNext: Int as uint128;

    decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrders>; // tokenId => index => order
    decreasePerpPositionLimitIndexNext: Int as uint128;

    perpPositions: map<Int, AccountPerpPosition>; // tokenId => user => direction => position


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

        self.increasePerpPositionMarketIndex = 0;
        self.increasePerpPositionMarketIndexNext = 0;
        self.decreasePerpPositionMarketIndex = 0;
        self.decreasePerpPositionMarketIndexNext = 0;

        self.increasePerpPositionLimitIndexNext = 0;
        self.decreasePerpPositionLimitIndexNext = 0;

    }

    // ============================ RBF ================================ //
    receive(msg: CreateIncreaseRBFPositionOrder) {

    }

    receive(msg: CancelIncreaseRBFPositionOrder) {
        
    }

    receive(msg: ExecuteIncreaseRBFPositionOrder) {
        
    }

    receive(msg: CreateDecreaseRBFPositionOrder) {
        
    }

    receive(msg: CancelDecreaseRBFPositionOrder) {
        
    }

    receive(msg: ExecuteDecreaseRBFPositionOrder) {
        
    }

    // ============================ RBF ================================ //
    receive(msg: CreateIncreaseLPPositionOrder) {
        
    }
    
    receive(msg: CancelIncreaseLPPositionOrder) {
        
    }
    
    receive(msg: ExecuteIncreaseLPPositionOrder) {
        
    }
    
    receive(msg: CreateDecreaseLPPositionOrder) {
        
    }
    
    receive(msg: CancelDecreaseLPPositionOrder) {
        
    }
    
    receive(msg: ExecuteDecreaseLPPositionOrder) {
        
    }

    // ============================ Perp ================================ //



}
