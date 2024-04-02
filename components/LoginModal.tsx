'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MetamaskIcon } from '@/common/icons';
import { ethers } from 'ethers';
import { walletConnectProvider } from '@/common/connections/walletConnect';
import { CoinbaseConnect } from '@/common/connections/coinbaseConnect';
import { useWeb3Provider } from '@/common/providers/Web3Provider';
import detectEthereumProvider from '@metamask/detect-provider';
import { SignMessage } from '@/components/SignMessage';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

interface LoginAction {
  icon: React.ReactNode;
  title: string;
  action: () => any;
}

export const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const { setProvider, provider, setUserAddress, userAddress, signature } = useWeb3Provider();
  const [openSignModal, setOpenSignModal] = useState(false);
  const loginList: LoginAction[] = [
    {
      title: 'Connect to metamask',
      icon: <MetamaskIcon />,
      action: async () => {
        try {
          const metaProvider = await detectEthereumProvider();
          if (!window.ethereum || !metaProvider) {
            alert('No crypto wallet found. Please install it.');
            return;
          }
          const provider = new ethers.BrowserProvider(window.ethereum);
          console.log(setProvider);
          setProvider(provider);
          // const signer = await provider.getSigner();
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          alert(accounts[0]);
          setUserAddress(accounts[0]);
          setOpenSignModal(true);
        } catch (e) {
          console.log({ e });
        }
      }
    },
    {
      title: 'Connect to wallet connect',
      icon: <></>,
      action: async () => {
        try {
          const walletProvider = await walletConnectProvider();
          await walletProvider.connect();
          console.log({ walletProvider: walletProvider.accounts });
          setOpenSignModal(true);
        } catch (e) {
          console.log({ e });
        }
      }
    },
    {
      title: 'Connect to coinbase wallet',
      icon: <></>,
      action: async () => {
        try {
          const walletProvider = await CoinbaseConnect();

          const accounts: string[] = await walletProvider.request({
            method: 'eth_requestAccounts'
          });
          if (!accounts || accounts.length <= 0) return;
          setUserAddress(accounts[0]);
          setProvider(new ethers.BrowserProvider(window.ethereum));
          setOpenSignModal(true);
        } catch (e) {
          console.log({ e });
        }
      }
    }
  ];

  useEffect(() => {
    (async () => {
      if (!userAddress) return;
      try {
        onClose();
      } catch (e) {
        console.log({ e });
      }
    })();
  }, [signature]);

  if (openSignModal)
    return <SignMessage open={openSignModal} onClose={() => setOpenSignModal(false)} />;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect wallet</DialogTitle>
            <DialogDescription>Connect to your wallet with signature</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-[24px]" style={{ gap: '18px' }}>
            {loginList.map(({ icon, action, title }) => (
              <Button
                key={title}
                variant="secondary"
                className=" gap-3 inline-flex"
                onClick={action}
              >
                {icon}
                <p>{title}</p>
              </Button>
            ))}
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
