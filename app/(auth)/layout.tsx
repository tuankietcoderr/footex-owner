"use client"
import useUserStore from "@/store/useOwnerStore"
import React, { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { useAuthModalContext } from "@/context/AuthModalContext"

const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useUserStore()
  const { fallbackUrl } = useAuthModalContext()
  if (user) {
    return redirect(fallbackUrl || "/")
  }
  return <div className="mx-4 mt-8 flex justify-center md:mx-auto">{children}</div>
}

export default Layout
