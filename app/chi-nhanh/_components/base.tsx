"use client"
import { logoutOwner } from "@/actions/auth-actions"
import { Button } from "@/components/ui/button"
import React, { PropsWithChildren } from "react"

const Base = ({ children: child }: PropsWithChildren) => {
  const onClickLogout = () => {
    logoutOwner()
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {child}
      <Button className="text-primary underline" variant={"link"} onClick={onClickLogout}>
        Thoát
      </Button>
    </div>
  )
}
export default Base
