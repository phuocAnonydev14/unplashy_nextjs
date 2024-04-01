'use client';

import Image from 'next/image';
import { HeaderQuickSearch } from '@/common/layouts/MainLayouts/components/HeaderQuickSearch';
import styles from './header.module.css';
import Link from 'next/link';
import { HeaderResponsive } from '@/common/layouts/MainLayouts/components/HeaderResponsive';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/common/layouts/MainLayouts/components/LoginModal';
import { useState } from 'react';
import { useWeb3Provider } from '@/common/providers/Web3Provider';

const menuItems = [
  {
    title: 'Discover',
    href: '/'
  },
  {
    title: 'Collections',
    href: '/collections'
  },
  {
    title: 'Categories',
    href: null
  },
  {
    title: 'Artists',
    href: null
  }
];

interface HeaderProps {
  isResponsive?: boolean;
  onCloseModal?: () => void;
  activeMenu?: string;
}

export const HeaderConTent = ({ isResponsive, onCloseModal, activeMenu }: HeaderProps) => {
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const { signature } = useWeb3Provider();
  return (
    <div
      style={{ width: isResponsive ? '100%' : '60%', gap: '20px' }}
      className={`flex  ${isResponsive ? 'flex-col-reverse items-start' : 'flex'} ${isResponsive ? 'justify-start' : 'justify-between'} md:hidden gap-20  font-[500] sm:hidden`}
    >
      <div
        className={`flex ${isResponsive && 'flex-col'} ${isResponsive ? 'items-start' : 'items-center'} gap-4  font-[500] ${styles['menu']} `}
      >
        {menuItems.map(({ title, href }, index) => {
          return (
            <span key={title}>
              <Link
                onClick={() => onCloseModal && onCloseModal()}
                href={!href ? '/' : href}
                className={`${index <= 1 && activeMenu?.endsWith(href as string) && styles.active}`}
              >
                {title}
              </Link>
            </span>
          );
        })}
      </div>
      <div
        className={`flex ${isResponsive && 'flex-col-reverse'} gap-3 ${isResponsive ? 'items-start' : 'items-center'}`}
      >
        <HeaderQuickSearch onCloseModal={onCloseModal} />
        <div className={'flex items-center gap-1'}>
          {/*{signature ? (*/}
          {/*  <>*/}
          {/*    <Avatar>*/}
          {/*      <AvatarImage*/}
          {/*        src="https://plus.unsplash.com/premium_photo-1677337459537-4af0da479a84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"*/}
          {/*        alt="@shadcn"*/}
          {/*      />*/}
          {/*      <AvatarFallback>CN</AvatarFallback>*/}
          {/*    </Avatar>*/}
          {/*    <p className={'font-semibold'}>User</p>*/}
          {/*  </>*/}
          {/*) : (*/}
          <Button onClick={() => setOpenSignInModal(true)}>Login</Button>
          {/*)}*/}
          <LoginModal open={openSignInModal} onClose={() => setOpenSignInModal(false)} />
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <>
      <div
        className={'mb-1 px-2 flex justify-between items-center sticky top-0 bg-[#fff] z-40'}
        style={{ boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px', paddingInline: '2rem' }}
      >
        <Link href={'/'}>
          <Image src={'/images/logo.png'} alt={'Logo'} width={80} height={80} />
        </Link>
        <HeaderResponsive />
      </div>
    </>
  );
};
