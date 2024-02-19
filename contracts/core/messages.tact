// ============================ RBF ================================ //
message CreateIncreaseRBFPosition {
    liquidityDelta: Int;
}

message CancelIncreaseRBFPosition {
    index: Int;
}

message ExecuteIncreaseRBFPosition {
    index: Int;
}

message CreateDecreaseRBFPosition {
    liquidityDelta: Int;
}

message CancelDecreaseRBFPosition {
    index: Int;
}

message ExecuteDecreaseRBFPosition {
    index: Int;
}

// ============================ LP ================================ //
message CreateIncreaseLPPosition {
    margin: Int;
    liquidityDelta: Int;
}

message CancelIncreaseLPPosition {
    index: Int;
}

message ExecuteIncreaseLPPosition {
    index: Int;
}

message CreateDecreaseLPPosition {
    margin: Int;
    liquidityDelta: Int;
}

message CancelDecreaseLPPosition {
    index: Int;
}

message ExecuteDecreaseLPPosition {
    index: Int;
}
