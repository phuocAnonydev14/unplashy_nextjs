import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HeaderQuickSearch} from "@/app/common/layouts/MainLayouts/components/HeaderQuickSearch";
export const Header = () => {
  return <>
    <div className={"my-1 px-6 flex justify-between items-center sticky top-1 bg-[#fff]"}
         style={{boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px"}}>
      <Image src={'/images/logo.png'} alt={"Logo"} width={80} height={80}/>
      <div className={'flex gap-5 items-center font-[500]'}>
        <span>Document</span>
        <span>Libraries</span>
        <span>Categories</span>
        <span>Artists</span>
      </div>
      <div className={'flex gap-2 items-center'}>
        <HeaderQuickSearch />
        <div>
          <Avatar>
            <AvatarImage src="https://plus.unsplash.com/premium_photo-1677337459537-4af0da479a84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <p className={'font-semibold'}>User</p>
      </div>
    </div>
  </>
}