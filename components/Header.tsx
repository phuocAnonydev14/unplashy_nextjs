import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeaderQuickSearch } from '@/components/HeaderQuickSearch';
import Link from 'next/link';
import { HeaderResponsive } from '@/components/HeaderResponsive';

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
  return (
    <div
      className={`flex ${isResponsive ? 'justify-start' : 'justify-between'}  gap-20  font-[500] sm:hidden md:hidden ${isResponsive ? 'flex-col-reverse items-start' : 'xl:flex'} gap-[20px] ${isResponsive ? 'w-full' : 'w-3/5'}`}
    >
      <div
        className={`flex ${isResponsive && 'flex-col'} ${isResponsive ? 'items-start' : 'items-center'} gap-4  font-[500]`}
      >
        {menuItems.map(({ title, href }, index) => {
          return (
            <span key={title} className={'hover:underline cursor-pointer text-[#707070]'}>
              <Link
                onClick={() => onCloseModal && onCloseModal()}
                href={!href ? '/' : href}
                className={`${index <= 1 && activeMenu?.endsWith(href as string) && 'text-black'}`}
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
          <div>
            <Avatar>
              <AvatarImage
                src="https://plus.unsplash.com/premium_photo-1677337459537-4af0da479a84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <p className={'font-semibold'}>User</p>
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <>
      <div
        className={'mb-1 flex justify-between items-center sticky top-0 bg-[#fff] z-40 px-[2rem]'}
        style={{ boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px' }}
      >
        <Link href={'/'}>
          <Image src={'/images/logo.png'} alt={'Logo'} width={80} height={80} />
        </Link>
        <HeaderResponsive />
      </div>
    </>
  );
};