"use client"

import AppAvatar from "@/components/app-avatar"
import { CommandItem } from "@/components/ui/command"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

type Props = {
  branch: IBranch
}

const BranchSwitcherItem = ({ branch }: Props) => {
  const { id } = useParams<{
    id: string
  }>()

  return (
    <CommandItem key={branch?._id} value={branch?.name}>
      <Link
        href={ROUTE.BRANCH.DASHBOARD.replace(":id", branch?._id!)}
        className="flex w-full items-center justify-between gap-2"
      >
        <AppAvatar src={branch?.logo!} alt={branch.name} />
        <p className="line-clamp-1 w-full">{branch.name}</p>
        <CheckIcon
          className={cn(
            "min-h-[1rem] min-w-[1rem]",
            id === branch._id ? "opacity-100" : "opacity-0"
          )}
        />
      </Link>
    </CommandItem>
  )
}

export default BranchSwitcherItem
