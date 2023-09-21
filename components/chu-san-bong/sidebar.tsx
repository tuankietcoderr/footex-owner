"use client"
import React, { useEffect } from "react"
import OwnerSidebarItem from "./sidebar-item"
import { Dice6, Home, LucideIcon, RectangleVertical, Trophy, Users2 } from "lucide-react"
import { useAuthModalContext } from "@/context/AuthModalContext"
import useUserStore from "@/store/useUserStore"
import { EUserRole } from "@/interface/IUser"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface OwnerSideBarNavItem {
  icon: LucideIcon
  label: string
  link: string
}

const OwnerSideBar = () => {
  const { user } = useUserStore()
  const { openModal, visible, closeModal } = useAuthModalContext()
  const pathname = usePathname()

  useEffect(() => {
    if (visible && (pathname.includes("dang-nhap") || pathname.includes("dang-ky"))) {
      closeModal()
    }
    if (!user || (user && user.role !== EUserRole.OWNER)) {
      if (visible || pathname.includes("dang-nhap") || pathname.includes("dang-ky")) return
      openModal()
    }
  }, [user, visible, pathname, openModal, closeModal])

  const sidebarNav: OwnerSideBarNavItem[] = [
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
      icon: Users2,
      label: "Quản lý khách hàng",
      link: "/quan-ly-khach-hang",
    },
  ]

  return (
    <aside className="flex max-h-screen min-h-screen flex-col items-center border-r border-border bg-card p-4 shadow-lg">
      <Link href={"/"}>
        <Image
          src={"/next.svg"}
          alt={"Next.js"}
          width={100}
          height={100}
          className="border border-border"
        />
      </Link>
      <div className="mt-8 gap-2">
        {sidebarNav.map((navItem, index) => (
          <OwnerSidebarItem
            key={navItem.link}
            icon={navItem.icon}
            label={navItem.label}
            link={navItem.link}
          />
        ))}
      </div>
    </aside>
  )
}

export default OwnerSideBar
