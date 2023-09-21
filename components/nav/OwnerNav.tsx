import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import React from "react"
import AccountBadge from "./account-badge"
import { Input } from "../ui/input"

const OwnerNav = () => {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <Search />
      </div>
      <Input placeholder="Tìm kiếm cái gì đó..." className="w-full border-none shadow-none" />
      <div className="flex items-center gap-2">
        <Button variant={"ghost"} size={"icon"}>
          <Bell size={20} />
        </Button>
        <ModeToggle />
        <AccountBadge />
      </div>
    </div>
  )
}

export default OwnerNav
