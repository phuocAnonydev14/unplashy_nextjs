import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';

const APP_NAME = 'My Awesome App';
const APP_LOGO_URL = 'https://example.com/logo.png';
const DEFAULT_ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/901179b13837480f92f4a9174b8e1ac8';
const DEFAULT_CHAIN_ID = 1;
export const CoinbaseConnect = async () => {
  // Initialize CoinbaseConnect Wallet SDK
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false
  });
  const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID);

  return ethereum;
};
