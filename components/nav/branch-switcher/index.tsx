import { getOwnerBranches } from "@/actions/branch-actions"
import AppAvatar from "@/components/app-avatar"
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
import IBranch from "@/interface/IBranch"
import { CaretSortIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import BranchSwitcherItem from "./branch-switcher-item"
import Link from "next/link"
import ROUTE from "@/constants/route"

type Props = {
  branchId: string
}

export default async function BranchSwitcher({ branchId }: Props) {
  const { data, success } = await getOwnerBranches()
  if (!success) return null
  const branches = data as IBranch[]
  const branch = branches.find((b) => b._id === branchId)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-full justify-between gap-2">
          <AppAvatar src={branch?.logo || ""} alt={branch?.name || ""} />
          <p className="line-clamp-1">{branch?.name || "Chọn một chi nhánh"}</p>
          <CaretSortIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Tìm kiếm chi nhánh..." />
            <CommandEmpty>Không có kết quả</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => (
                <BranchSwitcherItem branch={branch} key={branch._id} />
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <Link href={ROUTE.BRANCH.CREATE} className="flex items-center">
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Tạo chi nhánh mới
                </Link>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
