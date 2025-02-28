# yarn build
# yarn rundev deployMockJetton
NODE_ENV=$1 yarn run run deployPool
NODE_ENV=$1 yarn run run deployTLPJetton
NODE_ENV=$1 yarn run run deployMultisig
NODE_ENV=$1 yarn run run updateBaseConfig
# multisig set manager
# NODE_ENV=$1 yarn run run requestSetManager
# NODE_ENV=$1 yarn run run approveSetManager
NODE_ENV=$1 yarn run run updatePoolConfig
NODE_ENV=$1 yarn run run listToken
NODE_ENV=$1 yarn run run incrementDeployId