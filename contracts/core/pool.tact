import "@stdlib/deploy";
import "./messages";
import "./events";
import "./structs";

contract Pool with Deployable {

    // config
    minExecutionFee: Int;
    gasConsumption: Int;
    minTimeDelayExecutor: Int = 6; // executor execute after 6s
    maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min

    tokenIds: map<Int, Bool>; // tokenId => enabled
    executors: map<Address, Bool>; // account => enabled

    // RBF
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>; // index => order
    increaseRBFPositionIndexNext: Int as uint128;

    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>; // index => order
    decreaseRBFPositionIndexNext: Int as uint128;

    globalRBFPosition: GlobalRBFPosition;
    fundPositions: map<Address, RBFPosition>; // trader => RBF

    // LP
    increaseLPPositionOrders: map<Int, IncreaseLPPositionOrder>; // index => order
    increaseLPPositionIndexNext: Int as uint128;

    decreaseLPPositionOrders: map<Int, DecreaseLPPositionOrder>; // index => order
    decreaseLPPositionIndexNext: Int as uint128;

    globalLiquidity: Int;
    globalLPPosition: map<Int, GlobalLPPosition>; // tokenId => globalLP
    lpPositions: map<Address, LPPosition>; // trader => LP

    // Perp
    /// market order
    increasePerpPositionMarketOrders: map<Int, IncreasePerpPositionMarketOrders>; // tokenId => index => order
    increasePerpPositionMarketIndexNext: Int as uint128;

    decreasePerpPositionMarketOrders: map<Int, DecreasePerpPositionMarketOrders>; // tokenId => index => order
    decreasePerpPositionMarketIndexNext: Int as uint128;

    /// limit order
    increasePerpPositionLimitOrders: map<Int, IncreasePerpPositionLimitOrders>; // tokenId => index => order
    increasePerpPositionLimitIndexNext: Int as uint128;

    decreasePerpPositionLimitOrders: map<Int, DecreasePerpPositionLimitOrders>; // tokenId => index => order
    decreasePerpPositionLimitIndexNext: Int as uint128;

    perpPositions: map<Int, AccountPerpPosition>; // tokenId => user => direction => position


    init() {
        self.minExecutionFee = 0;
        self.gasConsumption = 0;

        self.increaseRBFPositionIndexNext = 0;
        self.decreaseRBFPositionIndexNext = 0;
        self.globalRBFPosition = GlobalRBFPosition{riskBufferFund: 0, liquidity: 0};

        self.increaseLPPositionIndexNext = 0;
        self.decreaseLPPositionIndexNext = 0;

        self.globalLiquidity = 0;

        self.increasePerpPositionMarketIndexNext = 0;
        self.decreasePerpPositionMarketIndexNext = 0;

        self.increasePerpPositionLimitIndexNext = 0;
        self.decreasePerpPositionLimitIndexNext = 0;

    }
    // ============================ Entry ================================ //
    /**
    * @dev This function is called when the contract receives a TokenNotification message.
    * It checks the token and handles the corresponding operation code.
    * @param msg The TokenNotification message received.
    */
    receive(msg: TokenNotification) {
        // TODO check token

        // get op code
        let opCode: Int = msg.forward_payload.loadInt(32);
        if (opCode == 1) {
            let account: Address = msg.from;
            let liquidityDelta: Int = msg.forward_payload.loadInt(256);
            // for dev
            dump("receive create increase rbf position order op code");
            dump(liquidityDelta);
            // TODO check amount == liquidityDelta?

            self.handleCreateIncreaseRBFPositionOrder(account, liquidityDelta);
        } 
    }

    // ============================ RBF ================================ //
    fun handleCreateIncreaseRBFPositionOrder(account: Address, liquidityDelta: Int) {
        dump("handleCreateIncreaseRBFPositionOrder");
        let ctx: Context = context();
        // check gas
        require(ctx.value - msg.executionFee >= self.gasConsumption, "gas not enough");
        // check execution fee
        require(msg.executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        self.increaseRBFPositionIndexNext = self.increaseRBFPositionIndexNext + 1;
        let index: Int = self.increaseRBFPositionIndexNext;
        self.increaseRBFPositionOrders.set(index, IncreaseRBFPositionOrder{
            account: ctx.sender,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            blockTime: now()
        });

        // event
        emit(IncreaseRBFPositionCreatedEvent{
            account: ctx.sender,
            liquidityDelta: msg.liquidityDelta,
            executionFee: msg.executionFee,
            index: index
        }.toCell());
    }

    receive(msg: CancelIncreaseRBFPositionOrder) {
        let ctx: Context = context();

        // check gas
        require(ctx.value >= self.gasConsumption, "gas not enough");

        // check order
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        if (orderOpt == null) {
            return;
        }
        let order: IncreaseRBFPositionOrder = orderOpt!!;

        self.shouldCancel(order.blockTime, ctx.sender);

        // delete order
        self.increaseRBFPositionOrders.set(msg.index, null);
        // event
        emit(IncreaseRBFPositionCancelledEvent{
            index: msg.index
        }.toCell());
    }

    receive(msg: ExecuteIncreaseRBFPositionOrder) {
        let orderOpt: IncreaseRBFPositionOrder? = self.increaseRBFPositionOrders.get(msg.index);
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;

        // update position
        let fundPositionOpt: RBFPosition? = self.fundPositions.get(order.account);
        // init position if not exist
        let fundPosition: RBFPosition = RBFPosition{
                liquidity: 0,
                unlockTime: 0
            };
        if (fundPositionOpt != null) {
            fundPosition = fundPositionOpt!!;
        }

        // TODO calculate bonus

        fundPosition.liquidity = fundPosition.liquidity + order.liquidityDelta;

        // set position
        self.fundPositions.set(order.account, fundPosition);

        // delete order
        self.increaseRBFPositionOrders.set(msg.index, null);

        // event
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


    // ============================ private function ================================ //
    fun shouldCancel(blockTime: Int, account: Address) {
        let ctx: Context = context();
        // executor or trader
        let isExecutorOpt: Bool? = self.executors.get(ctx.sender);
        let isExecutor: Bool = false;
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }
        // executor cancel must after minTimeDelayExecutor
        if (isExecutor) {
            require(blockTime + self.minTimeDelayExecutor <= now(), "too early");
        }
        // check sender
        require(ctx.sender == account || isExecutor, "invalid sender");
        // trader cancel must after minTimeDelayTrader
        if (!isExecutor) {
            require(blockTime + self.minTimeDelayTrader <= now(), "too early");
        }
    }

}
