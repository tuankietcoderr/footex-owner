"use client"
// import CreateOrg from "@/components/modal/create-org"
import { COMMON } from "@/constants/common"
import useBranchStore from "@/store/useBranchStore"
import useFieldStore from "@/store/useFieldStore"
import React, { createContext, useState, useContext, useEffect } from "react"
import dynamic from "next/dynamic"

const CreateOrg = dynamic(() => import("@/components/modal/create-branch"), { ssr: false })

interface IBranchManagementContext {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openModal?: () => void
  closeModal?: () => void
}

export const BranchManagementContext = createContext<IBranchManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
})

export const BranchManagementProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { branch, loadBranch } = useBranchStore()
  const { getFieldsOfOrg, reset } = useFieldStore()
  const [isCreateModalShown, setIsCreateModalShown] = useState(false)
  useEffect(() => {
    if (!branch) {
      const lastOrgId = localStorage.getItem(COMMON.LAST_ORG_ID)
      if (lastOrgId) {
        loadBranch(lastOrgId)
      }
    } else {
      localStorage.removeItem(COMMON.LAST_ORG_ID)
    }
  }, [branch])

  useEffect(() => {
    if (branch) {
      localStorage.setItem(COMMON.LAST_ORG_ID, branch?._id!)
      getFieldsOfOrg(branch?._id!)
    }
  }, [branch])

  const openModal = () => {
    setIsCreateModalShown(true)
  }

  const closeModal = () => {
    setIsCreateModalShown(false)
  }

  const value = {
    isCreateModalShown,
    setIsCreateModalShown,
    openModal,
    closeModal,
  }
  return (
    <BranchManagementContext.Provider value={value}>
      {children}
      <CreateOrg visible={isCreateModalShown} onClose={closeModal} />
    </BranchManagementContext.Provider>
  )
}

export const useBranchManagementContext = () => {
  return useContext(BranchManagementContext)
}
