'use client'

import {Command, CommandInput, CommandList} from "@/components/ui/command";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const HeaderQuickSearch = () => {

  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const handleSubmit = async () => {
    try {
      setSearchQuery('')
    } catch (e) {
      console.log(e)
    }
  }

  return <div className={'mr-3'}>
    <Command style={{boxShadow: "unset"}} className="rounded-lg border shadow-md">
      <CommandInput value={searchQuery} onValueChange={val => setSearchQuery(val)} onKeyDown={e => {
        if (e.key === "Enter") {
          handleSubmit().then()
          router.push(`/search?q=${searchQuery}`)
        }
      }} placeholder="Search photos..."/>
      <CommandList>
      </CommandList>
    </Command>
  </div>
}