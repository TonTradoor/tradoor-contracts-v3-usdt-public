# yarn build
# yarn rundev deployMockJetton
# NODE_ENV=$1 yarn run run deployOrderBook
NODE_ENV=$1 yarn run run deployPool
NODE_ENV=$1 yarn run run deployTLPJetton
NODE_ENV=$1 yarn run run orderBookSetConfig
NODE_ENV=$1 yarn run run poolSetConfig
NODE_ENV=$1 yarn run run poolSetTokenConfig
NODE_ENV=$1 yarn run run incrementDeployId