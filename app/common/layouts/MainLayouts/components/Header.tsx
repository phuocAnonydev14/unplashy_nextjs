import Image from "next/image";

export const Header = () => {
  return <>
    <div className={"my-1 px-6 flex justify-between items-center sticky top-1 bg-[#fff]"} style={{boxShadow:"rgba(0, 0, 0, 0.04) 0px 3px 5px"}}>
      <Image src={'/images/logo.png'} alt={"Logo"} width={80} height={80}/>
      <div className={'flex gap-5 items-center font-[500]'}>
        <span>Document</span>
        <span>Libraries</span>
        <span>Categories</span>
        <span>Artists</span>
      </div>
      <div>
        <span>User</span>
      </div>
    </div>
  </>
}