"use client"

import React from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"
import { usePathname, useSearchParams } from "next/navigation"
import { COMMON } from "@/constants/common"

const AuthButton = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fullUrl = `${pathname}?${searchParams.toString()}`
  const fallbackUrl = `?${COMMON.REDIRECT}=${encodeURIComponent(fullUrl)}`

  return (
    <>
      <Button className="w-max" asChild>
        <Link href={ROUTE.AUTH.SIGN_IN.concat(fallbackUrl)} className="line-clamp-1 text-center">
          Đăng nhập
        </Link>
      </Button>
      <Button variant={"outline"} className="w-max" asChild>
        <Link href={ROUTE.AUTH.SIGN_UP.concat(fallbackUrl)} className="line-clamp-1 text-center">
          Đăng ký
        </Link>
      </Button>
    </>
  )
}

export default AuthButton
