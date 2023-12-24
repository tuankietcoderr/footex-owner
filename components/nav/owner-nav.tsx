import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import React from "react"
import { Input } from "../ui/input"
import BranchSwitcher from "./branch-switcher"
import { getSession } from "@/services/auth/cookie-session"
import { cn } from "@/lib/utils"

type Props = {
  branchId: string
}

const OwnerNav = async ({ branchId }: Props) => {
  const { isLogin } = await getSession()
  return (
    <div
      className={cn("grid grid-cols-[200px_auto] items-center gap-4", !isLogin && "grid-cols-1")}
    >
      <BranchSwitcher branchId={branchId} />
      <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Search />
        </div>
        <Input
          // ref={inputRef}
          // onFocus={inputOnFocus}
          placeholder="Tìm kiếm cái gì đó..."
          className="w-full border-none shadow-none"
        />
        <div className="flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"}>
            <Bell size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OwnerNav
