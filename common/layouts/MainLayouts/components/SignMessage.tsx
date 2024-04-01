'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ethers } from 'ethers';
import { toast, useToast } from '@/components/ui/use-toast';
import { useWeb3Provider } from '@/common/providers/Web3Provider';

interface SignMessageProps {
  open: boolean;
  onClose: () => void;
}

export const SignMessage = (props: SignMessageProps) => {
  const { open, onClose } = props;
  const { provider, signature, setSignature } = useWeb3Provider();
  const [message, setMessage] = React.useState('');
  const { toast } = useToast();
  const handleSignMessage = async () => {
    try {
      if (!message) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }
      const signer = await provider!.getSigner();
      const signature = await signer.signMessage(message);
      setSignature(signature);
      toast({
        variant: 'default',
        title: 'Sign in successfully.',
        description: 'Continue using app & enjoy it.'
      });
      onClose();
    } catch (e) {}
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect wallet</DialogTitle>
          <DialogDescription>Connect to your wallet with signature</DialogDescription>
        </DialogHeader>
        <div className={'flex flex-col gap-[24px]'} style={{ gap: '18px' }}>
          <div className="grid w-full max-w-sm items-center gap-1.5" style={{ gap: '10px' }}>
            <Label htmlFor="email">Message</Label>
            <Input
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              id="email"
              placeholder="Message"
            />
          </div>
          <Button onClick={handleSignMessage} type="button">
            Sign
          </Button>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
