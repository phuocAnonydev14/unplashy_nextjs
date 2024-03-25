'use client'

import {Command, CommandInput, CommandList} from "@/components/ui/command";
import {useState} from "react";

export const HeaderQuickSearch = () => {

  const [searchQuery, setSearchQuery] = useState('')

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
        }
      }} placeholder="Search photos..."/>
      <CommandList>
      </CommandList>
    </Command>
  </div>
}