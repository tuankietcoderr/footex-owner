"use client"
import React, { createContext, useContext } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"

const CreatePrizeModal = dynamic(() => import("@/components/modal/create/create-prize"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})

interface IPrizeCreate {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openCreateModal: () => void
  closeCreateModal: () => void
}

type IPrizeManagementContext = IPrizeCreate

const PrizeManagementContext = createContext<IPrizeManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
  openCreateModal: () => {},
  closeCreateModal: () => {},
})

export const PrizeManagementProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [isCreateModalShown, setIsCreateModalShown] = React.useState(false)
  const openCreateModal = () => {
    setIsCreateModalShown(true)
  }
  const closeCreateModal = () => {
    setIsCreateModalShown(false)
  }

  const value = {
    isCreateModalShown,
    setIsCreateModalShown,
    openCreateModal,
    closeCreateModal,
  }
  return (
    <PrizeManagementContext.Provider value={value}>
      {children}
      {isCreateModalShown && (
        <CreatePrizeModal visible={isCreateModalShown} onClose={closeCreateModal} />
      )}
    </PrizeManagementContext.Provider>
  )
}

export const usePrizeManagementContext = () => useContext(PrizeManagementContext)
