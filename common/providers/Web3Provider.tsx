'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { ethers } from 'ethers';

interface Web3ProviderContextVal {
  provider?: ethers.BrowserProvider;
  setProvider: (provider: ethers.BrowserProvider) => void;
  userAddress: string;
  setUserAddress: (address: string) => void;
  signature: string;
  setSignature: (signature: string) => void;
}

const Web3ProviderContext = createContext<Web3ProviderContextVal>({} as Web3ProviderContextVal);

export const Web3Provider = ({ children }: PropsWithChildren) => {
  const [userAddress, setUserAddress] = useState<string>('');
  const [providerState, setProviderState] = useState<ethers.BrowserProvider | undefined>();
  const [signature, setSignature] = useState<string>('');

  const payload = {
    provider: providerState,
    setProvider: (provider: ethers.BrowserProvider) => setProviderState(provider),
    userAddress,
    setUserAddress: (address: string) => setUserAddress(address),
    signature,
    setSignature: (signature: string) => setSignature(signature)
  };

  return <Web3ProviderContext.Provider value={payload}>{children}</Web3ProviderContext.Provider>;
};

export const useWeb3Provider = () => useContext(Web3ProviderContext);
