import { EthereumProvider } from '@walletconnect/ethereum-provider';

export const walletConnectProvider = async () => {
  const provider = await EthereumProvider.init({
    projectId: '716977d42cd7d4f4181d8d976deb6a41',
    chains: [1],
    methods: ['personal_sign', 'eth_sendTransaction'],
    showQrModal: true,
    qrModalOptions: {
      themeMode: 'light'
    }
  });

  return provider;
};
