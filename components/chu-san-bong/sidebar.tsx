"use client"
import { Building, Dice6, Home, LucideIcon, Trophy, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import OwnerSidebarItem from "./sidebar-item"
import useOwnerStore from "@/store/useOwnerStore"
import { Skeleton } from "../ui/skeleton"

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
      link: "/",
    },
    {
      icon: Dice6,
      label: "Quản lý sân",
      link: "/quan-ly-san",
    },
    {
      icon: Trophy,
      label: "Quản lý giải đấu",
      link: "/quan-ly-giai-dau",
    },
    {
      icon: User2,
      label: "Quản lý khách hàng",
      link: "/quan-ly-khach-hang",
    },
    {
      icon: Building,
      label: "Quản lý chi nhánh",
      link: "/quan-ly-chi-nhanh",
    },
  ]

  return (
    <aside className="hidden max-h-screen min-h-screen flex-col items-center border-r border-border bg-card p-4 shadow-sm md:flex">
      <Link href={"/"}>
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
