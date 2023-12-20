"use client"
import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"

const UnAuthorized = dynamic(() => import("@/components/un-authorized"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})
const UnBranch = dynamic(() => import("@/components/un-branch"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})

export default function UnAuthProvider({ children }: PropsWithChildren) {
  const { owner } = useOwnerStore()
  const { branch, branches } = useBranchStore()
  console.log({ branches })
  const pathname = usePathname()
  if (owner === null && pathname !== "/dang-nhap" && pathname !== "/dang-ky") {
    return <UnAuthorized />
  }

  if ((owner && branches && branches.length === 0) || (owner && !branch)) {
    return <UnBranch />
  }
  return children
}
