import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HeaderQuickSearch} from "@/common/layouts/MainLayouts/components/HeaderQuickSearch";
import styles from "./header.module.css"
import Link from "next/link";
import {HeaderResponsive} from "@/common/layouts/MainLayouts/components/HeaderResponsive";

const menuItems = [
  {
    title: "Discover",
    href: "/"
  },
  {
    title: "Collections",
    href: "/collections"
  },
  {
    title: "Categories",
    href: "/categories"
  },
  {
    title: "Artists",
    href: "/artists"
  }
]

interface HeaderProps {
  isResponsive?: boolean,
  onCloseModal?: () => void,
  activeMenu?: string
}

export const HeaderConTent = ({isResponsive, onCloseModal, activeMenu}: HeaderProps) => {
  return <div
    style={{width: "60%"}}
    className={`flex  ${isResponsive ? "flex-col-reverse items-start" : "flex"} ${isResponsive ? "justify-start" : "justify-between"} md:hidden gap-10  font-[500] sm:hidden`}>
    <div
      className={`flex ${isResponsive && "flex-col"} ${isResponsive ? "items-start" : "items-center"} gap-4  font-[500] ${styles['menu']} `}>
      {menuItems.map(({title, href}) => {
        return <span key={title}>
          <Link onClick={() => onCloseModal && onCloseModal()} href={href}
                className={`${activeMenu?.endsWith(href) && styles.active}`}>
          {title}
        </Link>
        </span>
      })}
    </div>
    <div
      className={`flex ${isResponsive && "flex-col-reverse"} gap-3 ${isResponsive ? "items-start" : "items-center"}`}>
      <HeaderQuickSearch onCloseModal={onCloseModal}/>
      <div className={'flex items-center gap-1'}>
        <div>
          <Avatar>
            <AvatarImage
              src="https://plus.unsplash.com/premium_photo-1677337459537-4af0da479a84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
              alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className={'font-semibold'}>User</p>
      </div>
    </div>
  </div>
}

export const Header = () => {
  return <>
    <div className={"mb-1 px-24 flex justify-between items-center sticky top-0 bg-[#fff] z-40"}
         style={{boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px", paddingInline: "1rem"}}>
      <Link href={'/'}>
        <Image src={'/images/logo.png'} alt={"Logo"} width={80} height={80}/>
      </Link>
      <HeaderResponsive/>
    </div>
  </>
}