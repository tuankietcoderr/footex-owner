"use client"
import useBigFieldStore from "@/store/useBigFieldStore"
import useUserStore from "@/store/useUserStore"
import React, { PropsWithChildren, useEffect } from "react"

const AuthProvider = ({ children }: PropsWithChildren) => {
  const { loadUser, user } = useUserStore()
  const { loadBigFields, reset } = useBigFieldStore()
  useEffect(() => {
    ;(async () => {
      await loadUser()
    })()
  }, [])

  useEffect(() => {
    if (user) {
      loadBigFields()
    }
  }, [user])

  // useEffect(() => {
  //   if()
  // }, [user])

  return children
}

export default AuthProvider
