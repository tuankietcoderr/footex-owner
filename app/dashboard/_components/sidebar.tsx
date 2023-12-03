"use client"
import { Building, Dice6, Home, LucideIcon, Trophy, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import OwnerSidebarItem from "./sidebar-item"
import useOwnerStore from "@/store/useOwnerStore"
import { Skeleton } from "@/components/ui/skeleton"
import ROUTE from "@/constants/route"

export interface IOwnerSideBarNavItem {
  icon: LucideIcon
  label: string
  link: string
}

const OwnerSideBar = () => {
  const { owner } = useOwnerStore()
  const sidebarNav: IOwnerSideBarNavItem[] = [
    {
      icon: Home,
      label: "Bảng điều khiển",
      link: ROUTE.DASHBOARD,
    },
    {
      icon: Dice6,
      label: "Quản lý sân",
      link: ROUTE.QUAN_LY_SAN.BASE,
    },
    {
      icon: Trophy,
      label: "Quản lý giải đấu",
      link: ROUTE.QUAN_LY_GIAI_DAU.BASE,
    },
    {
      icon: Building,
      label: "Quản lý chi nhánh",
      link: ROUTE.QUAN_LY_CHI_NHANH.BASE,
    },
  ]

  return (
    <aside className="hidden max-h-screen min-h-screen flex-col items-center border-r border-border bg-card p-4 shadow-sm md:flex">
      <Link href={ROUTE.DASHBOARD}>
        <Image
          src={"/next.svg"}
          alt={"Next.js"}
          width={100}
          height={100}
          className="border border-border"
        />
      </Link>
      <div className="mt-8 w-full">
        {owner !== undefined
          ? sidebarNav.map((navItem, index) => (
              <OwnerSidebarItem
                key={navItem.link}
                icon={navItem.icon}
                label={navItem.label}
                link={navItem.link}
              />
            ))
          : Array.from({ length: sidebarNav.length }, (_, index) => index + 1).map((_, index) => (
              <Skeleton key={index} className="mb-2 h-8 w-full" />
            ))}
      </div>
    </aside>
  )
}

export default OwnerSideBar
