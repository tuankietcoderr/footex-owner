"use client"
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import useOwnerStore from "@/store/useOwnerStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"
import { Skeleton } from "../ui/skeleton"
import { Button } from "../ui/button"
import useBranchStore from "@/store/useBranchStore"

const AccountBadge = () => {
  const { owner, logout } = useOwnerStore()
  const { reset } = useBranchStore()

  const onLogout = () => {
    logout()
    reset("all")
  }

  return owner === undefined ? (
    <Skeleton className="h-8 w-8 rounded-full md:h-10 md:w-10" />
  ) : owner === null ? (
    <Button asChild>
      <Link href={"/dang-nhap"} className="w-max">
        Đăng nhập
      </Link>
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src={owner?.avatar} alt={owner?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {owner?.name?.substring(0, 2) || "GE"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[101] -translate-x-8">
        <DropdownMenuLabel>{owner?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/ho-so"}>Hồ sơ</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/doi-bong"}>Đội bóng</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive dark:text-destructive-foreground"
        >
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountBadge
