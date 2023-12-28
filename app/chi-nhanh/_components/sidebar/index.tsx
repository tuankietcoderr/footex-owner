"use client"
import ROUTE from "@/constants/route"
import Image from "next/image"
import Link from "next/link"
import { Dice6, Home, LogOut, Receipt, Settings, Trophy } from "lucide-react"
import OwnerSidebarItem from "./sidebar-item"
import { IOwnerSideBarNavItem } from "./sidebar.type"
import { Button } from "@/components/ui/button"
import { logoutOwner } from "@/actions/auth-actions"

type Props = {
  branchId: string
}

const OwnerSideBar = ({ branchId }: Props) => {
  const sidebarNav: IOwnerSideBarNavItem[] = [
    {
      icon: Home,
      label: "Bảng điều khiển",
      link: ROUTE.BRANCH.DASHBOARD.replace(":id", branchId),
    },
    {
      icon: Dice6,
      label: "Quản lý sân",
      link: ROUTE.BRANCH.FIELD.INDEX.replace(":branchId", branchId),
    },
    {
      icon: Trophy,
      label: "Quản lý giải đấu",
      link: ROUTE.BRANCH.TOURNAMENT.INDEX.replace(":branchId", branchId),
    },
    {
      icon: Receipt,
      label: "Hóa đơn",
      link: ROUTE.BRANCH.INVOICE.replace(":branchId", branchId),
    },
    {
      icon: Settings,
      label: "Cài đặt",
      link: ROUTE.BRANCH.SETTING.INDEX.replace(":branchId", branchId),
    },
  ]

  const handleLogout = () => {
    logoutOwner()
  }

  return (
    <div className="relative">
      {!branchId && (
        <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
          <p className="mx-2 text-center text-xl font-bold">Vui lòng chọn chi nhánh</p>
        </div>
      )}
      <aside className="flex max-h-screen min-h-screen flex-col items-center space-y-8 border-r border-border bg-card p-4 shadow-sm">
        <Link href={ROUTE.BRANCH.DASHBOARD.replace(":id", branchId)}>
          <Image
            src={"/next.svg"}
            alt={"Next.js"}
            width={100}
            height={100}
            className="border border-border"
            priority
          />
        </Link>
        <div className="flex w-full flex-1 flex-col justify-between">
          <div>
            {sidebarNav.map((navItem) => (
              <OwnerSidebarItem
                key={navItem.link}
                icon={navItem.icon}
                label={navItem.label}
                link={navItem.link}
              />
            ))}
          </div>
          <Button
            className={`w-full cursor-pointer justify-start rounded-lg px-4 py-2 text-destructive`}
            asChild
            variant={"ghost"}
            onClick={handleLogout}
          >
            <div className="flex gap-4">
              <LogOut size={20} />
              Đăng xuất
            </div>
          </Button>
        </div>
      </aside>
    </div>
  )
}

export default OwnerSideBar
