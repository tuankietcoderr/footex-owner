"use client"
import { cn } from "@/lib/utils"
import useUserStore from "@/store/useUserStore"
import React from "react"
import { Skeleton } from "./ui/skeleton"

type BlurElementProps = {
  wrapperClassname?: string
  visible?: boolean
} & React.PropsWithChildren

const BlurElement = ({ children, wrapperClassname, visible }: BlurElementProps) => {
  const { user } = useUserStore()
  const visibleBlur = visible !== undefined ? visible && user === undefined : user === undefined
  return !visibleBlur ? (
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
