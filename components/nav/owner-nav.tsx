"use client"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAuthModalContext } from "@/context/AuthModalContext"
import { Bell, Search } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"
import AccountBadge from "./account-badge"
import BranchSwitcher from "./branch-switcher"

const OwnerNav = () => {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { mustAuthorize } = useAuthModalContext()

  const inputOnFocus = () => {
    mustAuthorize()
  }

  return (
    <div className="grid grid-cols-[200px_auto] gap-4">
      <BranchSwitcher className="h-full" />
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Search />
        </div>
        <Input
          ref={inputRef}
          onFocus={inputOnFocus}
          placeholder="Tìm kiếm cái gì đó..."
          className="w-full border-none shadow-none"
        />
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"}>
            <Bell size={20} />
          </Button>
          <ModeToggle />
          <AccountBadge />
        </div>
      </div>
    </div>
  )
}

export default OwnerNav
