"use client"
// import CreateOrg from "@/components/modal/create-org"
import { COMMON } from "@/constants/common"
import useBranchStore from "@/store/useBranchStore"
import useFieldStore from "@/store/useFieldStore"
import React, { createContext, useState, useContext, useEffect } from "react"
import dynamic from "next/dynamic"
import useOwnerStore from "@/store/useOwnerStore"
import useTournamentStore from "@/store/useTournamentStore"
import usePrizeStore from "@/store/usePrizeStore"
import LoadingOverlay from "@/components/loading-overlay"

const CreateOrg = dynamic(() => import("@/components/modal/create/create-branch"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})

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
  const { getFieldsOfBranch, reset } = useFieldStore()
  const { getTournamentsOfBranch } = useTournamentStore()
  const { getPrizesOfBranch } = usePrizeStore()
  const { owner } = useOwnerStore()
  const [isCreateModalShown, setIsCreateModalShown] = useState(false)
  useEffect(() => {
    if (owner) {
      if (!branch) {
        const lastOrgId = localStorage.getItem(COMMON.LAST_ORG_ID)
        if (lastOrgId) {
          loadBranch(lastOrgId)
        }
      } else {
        localStorage.removeItem(COMMON.LAST_ORG_ID)
      }
    }
  }, [branch, owner])

  useEffect(() => {
    if (branch) {
      localStorage.setItem(COMMON.LAST_ORG_ID, branch?._id!)
      Promise.all([
        getFieldsOfBranch(branch?._id!),
        getTournamentsOfBranch(branch?._id!),
        getPrizesOfBranch(branch?._id!),
      ])
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
      {isCreateModalShown && <CreateOrg visible={isCreateModalShown} onClose={closeModal} />}
    </BranchManagementContext.Provider>
  )
}

export const useBranchManagementContext = () => {
  return useContext(BranchManagementContext)
}
