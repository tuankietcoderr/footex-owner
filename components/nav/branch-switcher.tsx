"use client"
import { CaretSortIcon, CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useBranchManagementContext } from "@/context/BranchManagementContext"
import IOrganization from "@/interface/IBranch"
import { cn } from "@/lib/utils"
import useBranchStore from "@/store/useBranchStore"
import { Skeleton } from "../ui/skeleton"
import { useAuthModalContext } from "@/context/AuthModalContext"

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function BranchSwitcher({ className }: TeamSwitcherProps) {
  const { branches, branch, setBranch } = useBranchStore()
  const { openModal } = useBranchManagementContext()
  const { mustAuthorize } = useAuthModalContext()
  const [open, setOpen] = React.useState(false)

  const onSelectCreateOrg = () => {
    setOpen(false)
    openModal && openModal()
  }

  const onSelectOrg = (org: IOrganization) => {
    setOpen(false)
    setBranch(org)
  }

  const onOpenChange = (open: boolean) => {
    if (!mustAuthorize()) {
      setOpen(open)
    }
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {branches === undefined ? (
        <Skeleton className="w-[200px]" />
      ) : (
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Chọn một sân bóng"
            className={cn("justify-between", className)}
          >
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={branch?.logo} alt={branch?.name} />
              <AvatarFallback>{branch?.name?.substring(0, 2) || "GE"}</AvatarFallback>
            </Avatar>
            <p className="line-clamp-1">{branch?.name || "Chọn một cơ sở"}</p>
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Tìm kiếm sân bóng..." />
            <CommandEmpty>Không có kết quả</CommandEmpty>
            <CommandGroup>
              {branches !== undefined && (branches === null || branches?.length === 0) ? (
                <p className="p-2 text-center text-xs text-gray-500">Chưa có gì</p>
              ) : (
                branches?.map((bf, index) => (
                  <CommandItem
                    key={bf?._id}
                    onSelect={() => onSelectOrg(bf)}
                    value={bf?.name + index.toString()}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={bf.logo} alt={bf.name} className="grayscale" />
                      <AvatarFallback>{bf.name?.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {bf.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto min-h-[1rem] min-w-[1rem]",
                        branch?._id === bf._id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={onSelectCreateOrg}>
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                Tạo cơ sở mới
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
