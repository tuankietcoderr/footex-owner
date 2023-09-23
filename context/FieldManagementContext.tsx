"use client"
import CreateFieldModal from "@/components/modal/create-field"
import React, { createContext, useContext } from "react"

interface IFieldManagementContext {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openCreateModal?: () => void
  closeCreateModal?: () => void
}

export const FieldManagementContext = createContext<IFieldManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
})

export const FieldManagementProvider = ({ children }: React.PropsWithChildren) => {
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
    <FieldManagementContext.Provider value={value}>
      {children}
      <CreateFieldModal visible={isCreateModalShown} onClose={closeCreateModal} />
    </FieldManagementContext.Provider>
  )
}

export const useFieldManagementContext = () => {
  return useContext(FieldManagementContext)
}
