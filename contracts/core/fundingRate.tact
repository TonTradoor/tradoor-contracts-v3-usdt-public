import "./messages";
import "./events";
import "./structs";
import "./constants";

trait fundingRate {

    // fun sampleAndAdjustFundingRate(globalFundingRateSample: GlobalFundingRateSample, position: GlobalLiquidityPosition, priceState: PriceState, interestRate: Int, timestamp: Int, globalPosition: GlobalPosition) {

    //     // calculate if should adjust funding rate and funding rate deltax96
    //     let res: SamplePremiumRateResult = self.samplePremiumRate(globalFundingRateSample, position, priceState, interestRate, timestamp);
    //     // if should adjust funding rate

    //     if (res.shouldAdjustFundingRate) {

    //         // self.calculateFundingRateGrowthX96();

    //         // self.snapshotAndAdjustGlobalFundingRate();
    //     }


    // }

    fun samplePremiumRate(sample: GlobalFundingRateSample, position: GlobalLiquidityPosition, priceState: PriceState, interestRateX96: Int, timestamp: Int): SamplePremiumRateResult {
        let lastAdjustFundingRateTime: Int = sample.lastAdjustFundingRateTime;
        let maxSamplingTime: Int = lastAdjustFundingRateTime + ADJUST_FUNDING_RATE_INTERVAL;

        if (maxSamplingTime < timestamp) {
            timestamp = maxSamplingTime;
        }

        let lastSamplingTime: Int = lastAdjustFundingRateTime + sample.sampleCount + SAMPLE_PREMIUM_RATE_INTERVAL;
        let timeDelta: Int = timestamp - lastSamplingTime;
        if (timeDelta < SAMPLE_PREMIUM_RATE_INTERVAL) {
            return SamplePremiumRateResult {
                sample: sample,
                shouldAdjustFundingRate: false,
                fundingRateDeltaX96: 0
            };
        }

        let premiumRateX96: Int = 0;
        if (position.liquidity > priceState.maxPriceImpactLiquidity) {
            premiumRateX96 = priceState.premiumRateX96 / priceState.maxPriceImpactLiquidity * position.liquidity;
        } else {
            premiumRateX96 = priceState.premiumRateX96;
        }

        // calculate if should adjust funding rate and funding rate deltax96
        if (position.side) { // true is long
            premiumRateX96 = -premiumRateX96;
        }

        let cumulativePremiumRateX96: Int = 0;
        let sampleCountDelta: Int = timeDelta / SAMPLE_PREMIUM_RATE_INTERVAL;
        let sampleCountAfter: Int = sample.sampleCount + sampleCountDelta;

        // TODO check formula
        cumulativePremiumRateX96 = premiumRateX96 * ((sample.sampleCount + 1 + sampleCountAfter) * sampleCountDelta / 2 );
        cumulativePremiumRateX96 = sample.cumulativePremiumRateX96 + cumulativePremiumRateX96;

        if (sampleCountAfter < REQUIRED_SAMPLE_COUNT) {
            sample.cumulativePremiumRateX96 = cumulativePremiumRateX96;
            sample.sampleCount = sampleCountAfter;
            return SamplePremiumRateResult {
                sample: sample,
                shouldAdjustFundingRate: false,
                fundingRateDeltaX96: 0
            };
        }

        let premiumRateAvgX96: Int = 0;
        premiumRateAvgX96 = cumulativePremiumRateX96 / PREMIUM_RATE_AVG_DENOMINATOR;
        if (cumulativePremiumRateX96 < 0) {
            premiumRateAvgX96 = -premiumRateAvgX96;
        }

        let fundingRateDeltaX96: Int = premiumRateAvgX96 + self.clump(premiumRateAvgX96, interestRateX96);
        
        sample.lastAdjustFundingRateTime = maxSamplingTime;
        sample.cumulativePremiumRateX96 = 0;
        sample.sampleCount = 0;

        return SamplePremiumRateResult {
                sample: sample,
                shouldAdjustFundingRate: true,
                fundingRateDeltaX96: fundingRateDeltaX96
            };
    }

    fun clump(premiumRateAvgX96: Int, interestRateX96: Int): Int {
        let rateDeltaX96: Int = interestRateX96 - premiumRateAvgX96;
        if (rateDeltaX96 > PREMIUM_RATE_CLAMP_BOUNDARY_X96) {
            return PREMIUM_RATE_CLAMP_BOUNDARY_X96;
        } else if (rateDeltaX96 < -PREMIUM_RATE_CLAMP_BOUNDARY_X96) {
            return -PREMIUM_RATE_CLAMP_BOUNDARY_X96;
        } else {
            return rateDeltaX96;
        }

    }

    fun calculateFundingRateGrowthX96(globalRiskBufferFund: GlobalRiskBufferFund, globalPosition: GlobalPosition, fundingRateDeltaX96: Int, maxFundingRate: Int, indexPrice: Int): FundingRateGrowthX96 {
        let res: FundingRateGrowthX96 = FundingRateGrowthX96 {
            clampedFundingRateDeltaX96: 0,
            longFundingRateGrowthAfterX96: 0,
            shortFundingRateGrowthAfterX96: 0
        };
        let maxFundingRateX96: Int = self.calculateMaxFundingRateX96(maxFundingRate);
        if (fundingRateDeltaX96 > maxFundingRateX96) {
            res.clampedFundingRateDeltaX96 = maxFundingRateX96;
        } else if (fundingRateDeltaX96 < -maxFundingRateX96) {
            res.clampedFundingRateDeltaX96 = -maxFundingRateX96;
        } else {
            res.clampedFundingRateDeltaX96 = fundingRateDeltaX96;
        }
        let paidSize: Int = 0;
        let receivedSize: Int = 0;
        let clampedFundingRateDeltaAbsX96: Int = 0;
        if res.clampedFundingRateDeltaX96 >= 0 {
            paidSize = globalPosition.longSize;
            receivedSize = globalPosition.shortSize;
            clampedFundingRateDeltaAbsX96 = res.clampedFundingRateDeltaX96;
        } else {
            paidSize = globalPosition.shortSize;
            receivedSize = globalPosition.longSize;
            clampedFundingRateDeltaAbsX96 = -res.clampedFundingRateDeltaX96;
        }

        let paidFundingRateGrowthDeltaX96: Int = indexPrice * clampedFundingRateDeltaAbsX96 / Q96;

        let receivedFundingRateGrowthDeltaX96: Int = 0;
        if (paidFundingRateGrowthDeltaX96 > 0) {
            if (receivedSize > 0) {
                receivedFundingRateGrowthDeltaX96 = paidSize * paidFundingRateGrowthDeltaX96 / receivedSize;
            } else {
                let riskBufferFundDelta: Int = paidSize * paidFundingRateGrowthDeltaX96 / Q96;
                let riskBufferFundAfter: Int = globalRiskBufferFund.riskBufferFund + riskBufferFundDelta;
                globalRiskBufferFund.riskBufferFund = riskBufferFundAfter;
                // TODO return globalRiskBufferFund or riskBufferFundAfter
            }
        }
        res.longFundingRateGrowthAfterX96 = globalPosition.longFundingRateGrowthX96;
        res.shortFundingRateGrowthAfterX96 = globalPosition.shortFundingRateGrowthX96;

        if (res.clampedFundingRateDeltaX96 >= 0) {
            res.longFundingRateGrowthAfterX96 = res.longFundingRateGrowthAfterX96 - paidFundingRateGrowthDeltaX96;
            res.shortFundingRateGrowthAfterX96 = res.shortFundingRateGrowthAfterX96 + receivedFundingRateGrowthDeltaX96;
        } else {
            res.longFundingRateGrowthAfterX96 = res.longFundingRateGrowthAfterX96 + receivedFundingRateGrowthDeltaX96;
            res.shortFundingRateGrowthAfterX96 = res.shortFundingRateGrowthAfterX96 - paidFundingRateGrowthDeltaX96;
        }
        return res;
    }

    fun calculateMaxFundingRateX96(maxFundingRate: Int): Int {
        return maxFundingRate / Q96 * BASIS_POINTS_DIVISOR;
    }

    // TODO imp in main contract
    fun snapshotAndAdjustGlobalFundingRate() {

    }

}