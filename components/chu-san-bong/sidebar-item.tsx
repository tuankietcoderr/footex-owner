"use client"
import { Home, LucideIcon, LucideProps } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { memo } from "react"
import { Button } from "../ui/button"
import { IOwnerSideBarNavItem } from "./sidebar"

const OwnerSidebarItem = ({ icon: Icon, label, link }: IOwnerSideBarNavItem) => {
  const pathname = usePathname()
  const isActive = pathname === link
  return (
    <Button
      // asChild
      className={`mb-1 block justify-start rounded-lg px-4 py-2 ${
        isActive ? "bg-primary" : ""
      } w-full`}
      asChild
      variant={isActive ? "default" : "ghost"}
    >
      <Link className="flex gap-4" href={link} scroll={false}>
        <Icon size={20} className={isActive ? "text-secondary" : "text-gray-500"} />
        <p className={isActive ? "text-secondary" : "text-gray-500"}>{label}</p>
      </Link>
    </Button>
  )
}

export default memo(OwnerSidebarItem)
