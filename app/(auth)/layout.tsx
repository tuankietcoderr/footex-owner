"use client"
import useOwnerStore from "@/store/useOwnerStore"
import React, { PropsWithChildren } from "react"
import { redirect } from "next/navigation"
import { useAuthModalContext } from "@/context/AuthModalContext"

const Layout = ({ children }: PropsWithChildren) => {
  const { owner } = useOwnerStore()
  const { fallbackUrl } = useAuthModalContext()
  if (owner) {
    return redirect(fallbackUrl || "/")
  }
  return <div className="mx-4 mt-8 flex justify-center md:mx-auto">{children}</div>
}

export default Layout
