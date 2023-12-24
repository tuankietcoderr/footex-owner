"use client"
import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const AvgRatingItem = (mock: any) => {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? "all"
  const active = filter === mock.type
  return (
    <Button variant={"outline"} className={cn(active && "border-primary")} asChild>
      <Link
        href={`?filter=${mock.type}`}
        className={cn(active && "text-primary")}
        replace
        scroll={false}
      >
        {mock.type === "all" ? "Tất cả" : `${mock.type} sao`}{" "}
        {mock.count !== undefined ? `(${mock.count})` : ""}
      </Link>
    </Button>
  )
}

export default AvgRatingItem
