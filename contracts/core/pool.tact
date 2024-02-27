import "@stdlib/deploy";
import "@stdlib/ownable";
import "./messages";
import "./events";
import "./structs";
import "./constants";

contract Pool with Deployable, Ownable {

    // config
    minExecutionFee: Int;
    gasConsumption: Int;
    const minTimeDelayExecutor: Int = 6; // executor execute after 6s
    const maxTimeDelayExecutor: Int = 30 * 60; // executor execute before 30min
    const minTimeDelayTrader: Int = 3 * 60; // trader execute after 3min
    const basisPoint: Int = 100000000; // 100%

    tokenIds: map<Int, Bool>; // tokenId => enabled
    executors: map<Address, Bool>; // account => enabled

    // admin
    usdc: Address; // pool USDC jetton wallet address
    owner: Address;
    operator: Address;

    // RBF
    increaseRBFPositionOrders: map<Int, IncreaseRBFPositionOrder>; // index => order
    increaseRBFPositionIndexNext: Int as uint128;

    decreaseRBFPositionOrders: map<Int, DecreaseRBFPositionOrder>; // index => order
    decreaseRBFPositionIndexNext: Int as uint128;

    globalRBFPosition: GlobalRBFPosition;
    fundPositions: map<Address, RBFPosition>; // trader => RBF

    lockTime: Int = 10 * 24 * 60 * 60; // lock 10 days
    bonusFactor: Int = 1;

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
        self.owner = sender();
        self.usdc = newAddress(0, 0);
        self.operator = newAddress(0, 0);
        // TODO need owner to set
        self.executors.set(sender(), true);

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

    // ============================ Admin ================================ //

    receive(msg: SetOperator) {
        self.requireOwner();
        self.operator = msg.operator;
        self.reply("operator set".asComment());
    }

    receive(msg: SetUSDC) {
        self.requireOwner();
        self.usdc = msg.usdc;
        self.reply("usdc set".asComment());
    }

    get fun operator(): Address {
        return self.operator;
    }

    get fun usdc(): Address {
        return self.usdc;
    }

    fun onlyOperator() {
        require(sender() == self.operator, "only operator");
    }

    // ============================ Entry ================================ //
    /**
    * @dev This function is called when the contract receives a TokenNotification message.
    * It checks the token and handles the corresponding operation code.
    * @param msg The TokenNotification message received.
    */
    receive(msg: TokenNotification) {
        // TODO auto refund
        if (sender() != self.usdc) {
            return;
        }

        // get op code
        let operation: Slice = msg.forward_payload.loadRef().asSlice();
        let opCode: Int = operation.loadInt(32);
        if (opCode == OP_CREATE_INCREASE_RBF_POSITION) {
            let account: Address = operation.loadAddress();
            let liquidityDelta: Int = operation.loadCoins();
            let executionFee: Int = operation.loadCoins();
            // for dev
            dump("receive create increase rbf position order op code");
            dump(beginCell().storeAddress(account).endCell().hash());
            dump(liquidityDelta);
            dump(executionFee);
            // TODO check amount == liquidityDelta?

            self.handleCreateIncreaseRBFPositionOrder(account, executionFee, liquidityDelta);
        } 
    }

    // ============================ RBF ================================ //
    fun handleCreateIncreaseRBFPositionOrder(account: Address, executionFee: Int, liquidityDelta: Int) {
        dump("handleCreateIncreaseRBFPositionOrder");
        let ctx: Context = context();
        // check gas
        require(ctx.value - executionFee >= self.gasConsumption, "gas not enough");
        // check execution fee
        require(executionFee >= self.minExecutionFee, "execution fee not enough");

        // add new order
        let index: Int = self.increaseRBFPositionIndexNext;
        self.increaseRBFPositionIndexNext = self.increaseRBFPositionIndexNext + 1;
        self.increaseRBFPositionOrders.set(index, IncreaseRBFPositionOrder{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
            blockTime: now()
        });

        // event
        emit(IncreaseRBFPositionCreatedEvent{
            account: account,
            liquidityDelta: liquidityDelta,
            executionFee: executionFee,
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
        // check order
        require(orderOpt != null, "order not exist");

        let order: IncreaseRBFPositionOrder = orderOpt!!;
        self.shouldExecute(order.blockTime);

        // update position
        let fundPositionOpt: RBFPosition? = self.fundPositions.get(order.account);
        // init position if not exist
        let fundPosition: RBFPosition = RBFPosition{
                liquidity: 0,
                bonus: 0,
                unlockTime: 0
            };
        if (fundPositionOpt != null) {
            fundPosition = fundPositionOpt!!;
        }

        // update RBF
        // TODO update funding rate

        // calculate bonus
        if (self.globalRBFPosition.riskBufferFund < self.globalRBFPosition.liquidity) {
            let bonus: Int = self.bonusFactor * (self.globalRBFPosition.liquidity - self.globalRBFPosition.riskBufferFund) * self.basisPoint * order.liquidityDelta / self.globalRBFPosition.liquidity;
            dump("bonus:");
            dump(bonus);
            fundPosition.bonus = fundPosition.bonus + bonus;
        }

        // update position
        fundPosition.liquidity = fundPosition.liquidity + order.liquidityDelta;
        fundPosition.unlockTime = now() + self.lockTime;

        // set position
        dump("execute increase rbf position order");
        dump(beginCell().storeAddress(order.account).endCell().hash());

        self.fundPositions.set(order.account, fundPosition);

        // update global position
        self.globalRBFPosition.riskBufferFund = self.globalRBFPosition.riskBufferFund + order.liquidityDelta;
        self.globalRBFPosition.liquidity = self.globalRBFPosition.liquidity + order.liquidityDelta;

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

    fun shouldExecute(blockTime: Int) {
        let ctx: Context = context();
        // executor or trader
        let isExecutorOpt: Bool? = self.executors.get(ctx.sender);
        let isExecutor: Bool = false;
        if (isExecutorOpt != null) {
            isExecutor = isExecutorOpt!!;
        }

        // check sender
        require(isExecutor, "invalid sender");

        // executor cancel must after minTimeDelayExecutor
        require(blockTime + self.minTimeDelayExecutor <= now(), "too early");

        // executor cancel must before 
        require(blockTime + self.maxTimeDelayExecutor < now(), "order expired");
    }

}
