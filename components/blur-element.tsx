"use client"
import { cn } from "@/lib/utils"
import useUserStore from "@/store/useUserStore"
import React from "react"
import { Skeleton } from "./ui/skeleton"

type BlurElementProps = {
  wrapperClassname?: string
} & React.PropsWithChildren

const BlurElement = ({ children, wrapperClassname }: BlurElementProps) => {
  const { user } = useUserStore()
  return user !== undefined ? (
    children
  ) : (
    <div className={cn("relative", wrapperClassname)}>
      {children}
      <div className="absolute inset-0 z-10 rounded-lg bg-card" />
      <Skeleton className="absolute inset-0 z-10 rounded-lg" />
    </div>
  )
}

export default BlurElement
