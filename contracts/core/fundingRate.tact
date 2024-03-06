import "./messages";
import "./events";
import "./structs";
import "./constants";

trait fundingRate {

    GlobalFundingRateSamples: map<Int, GlobalFundingRateSample>;
    PreviousGlobalFundingRates: map<Int, PreviousGlobalFundingRate>;

    fun sampleAndAdjustFundingRate(globalFundingRateSample: GlobalFundingRateSample, position: GlobalLiquidityPosition, priceState: PriceState, interestRate: Int, timestamp: Int) {

        // calculate if should adjust funding rate and funding rate deltax96

        // if should adjust funding rate


    }

    fun samplePremiumRate(sample: GlobalFundingRateSample, position: GlobalLiquidityPosition, priceState: PriceState, interestRateX96: Int, timestamp: Int) {
        let lastAdjustFundingRateTime: Int = sample.lastAdjustFundingRateTime;
        let maxSamplingTime: Int = lastAdjustFundingRateTime + ADJUST_FUNDING_RATE_INTERVAL;

        if (maxSamplingTime < timestamp) {
            timestamp = maxSamplingTime;
        }

        let lastSamplingTime: Int = lastAdjustFundingRateTime + sample.sampleCount + SAMPLE_PREMIUM_RATE_INTERVAL;
        let timeDelta: Int = timestamp - lastSamplingTime;
        if (timeDelta < SAMPLE_PREMIUM_RATE_INTERVAL) {
            return;
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
            return;
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

        return;
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

    fun calculateFundingRateGrowthX96(): FundingRateGrowthX96 {

    }

    fun snapshotAndAdjustGlobalFundingRate() {

    }

}