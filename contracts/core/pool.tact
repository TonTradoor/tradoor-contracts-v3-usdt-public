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

    globalLiquidity: Int;
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
        let ctx: Context = context();
        /// add new order
        self.increaseRBFPositionIndexNext = self.increaseRBFPositionIndexNext + 1;
        let index: Int = self.increaseRBFPositionIndexNext;
        self.increaseRBFPositionOrders.set(index, IncreaseRBFPositionOrder{
            account: ctx.sender,
            liquidityDelta: msg.liquidityDelta,
            executionFee: 0,
            blockTime: now()
        });

        /// event
        emit(IncreaseRBFPositionCreatedEvent{
            account: ctx.sender,
            liquidityDelta: msg.liquidityDelta,
            executionFee: 0,
            index: index
        }.toCell());
    }

    receive(msg: CancelIncreaseRBFPositionOrder) {
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        require(orderOpt != null, "order not exist");

        /// delete order
        self.increaseRBFPositionOrders.set(msg.index, null);
        /// event
        emit(IncreaseRBFPositionCancelledEvent{
            index: msg.index
        }.toCell());
    }

    receive(msg: ExecuteIncreaseRBFPositionOrder) {
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;

        /// update position
        let fundPositionOpt: RBFPosition? = self.fundPositions.get(order.account);
        // init position if not exist
        let fundPosition: RBFPosition = RBFPosition{
                liquidity: 0,
                unlockTime: 0
            };
        if (fundPositionOpt != null) {
            fundPosition = fundPositionOpt!!;
        }

        fundPosition.liquidity = fundPosition.liquidity + order.liquidityDelta;

        // set position
        self.fundPositions.set(order.account, fundPosition);

        /// delete order
        self.increaseRBFPositionOrders.set(msg.index, null);

        /// event
        emit(IncreaseRBFPositionExecutedEvent{
            index: msg.index
        }.toCell());
        emit(RBFPositionIncreasedEvent{
            account: order.account,
            liquidityDelta: order.liquidityDelta,
            liquidityAfter: fundPosition.liquidity,
            unlockTimeAfter: fundPosition.unlockTime
        }.toCell());
    }

    receive(msg: CreateDecreaseRBFPositionOrder) {
        
    }

    receive(msg: CancelDecreaseRBFPositionOrder) {
        
    }

    receive(msg: ExecuteDecreaseRBFPositionOrder) {
        
    }

    get fun increaseRBFPositionIndex(): Int {
        return self.increaseRBFPositionIndex;
    }

    get fun increaseRBFPositionIndexNext(): Int {
        return self.increaseRBFPositionIndexNext;
    }

    get fun increaseRBFPositionOrder(index: Int): IncreaseRBFPositionOrder? {
        return self.increaseRBFPositionOrders.get(index);
    }

    get fun fundPosition(account: Address): RBFPosition? {
        return self.fundPositions.get(account);
    }

    // ============================ LP ================================ //
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
