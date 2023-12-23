"use client"
import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ClassValue } from "clsx"
import { cn } from "@/lib/utils"

type Props = {
  src: string
  alt: string
  fallback?: string
  className?: ClassValue
}

const AppAvatar = ({ alt, src, fallback = "FT", className }: Props) => {
  return (
    <Avatar className={cn("h-8 w-8", className)} suppressHydrationWarning>
      <AvatarImage src={src} alt={alt} className="object-cover" />
      <AvatarFallback suppressHydrationWarning className="bg-primary text-primary-foreground">
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
}

export default AppAvatar
