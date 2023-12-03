"use client"
import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import { useRouter } from "next/navigation"
import React, { PropsWithChildren, useEffect } from "react"

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { loadOwner, owner } = useOwnerStore()
  const { loadBranches, reset } = useBranchStore()
  useEffect(() => {
    ;(async () => {
      await loadOwner()
    })()
  }, [])

  useEffect(() => {
    if (owner) {
      loadBranches()
    }
  }, [owner])

  // useEffect(() => {
  //   if()
  // }, [owner])

  return children
}

export default AuthProvider
