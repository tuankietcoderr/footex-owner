"use client"
import IField from "@/interface/IField"
import React, { createContext, useContext } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"

const CreateFieldModal = dynamic(() => import("@/components/modal/create/create-field"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})
const UpdateFieldModal = dynamic(() => import("@/components/modal/update/update-field"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})
interface IFieldCreate {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openCreateModal: () => void
  closeCreateModal: () => void
}

interface IFieldUpdate {
  isUpdateModalShown: boolean
  setIsUpdateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openUpdateModal: () => void
  closeUpdateModal: () => void
  initialData: IField
  setInitialData: React.Dispatch<React.SetStateAction<IField>>
}

type IFieldManagementContext = IFieldCreate & IFieldUpdate

export const FieldManagementContext = createContext<IFieldManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
  openCreateModal: () => {},
  closeCreateModal: () => {},
  isUpdateModalShown: false,
  setIsUpdateModalShown: () => {},
  openUpdateModal: () => {},
  closeUpdateModal: () => {},
  initialData: {
    name: "",
    price: 0,
    description: "",
    type: 5,
  },
  setInitialData: () => {},
})

export const FieldManagementProvider = ({ children }: React.PropsWithChildren) => {
  const [isCreateModalShown, setIsCreateModalShown] = React.useState(false)
  const [isUpdateModalShown, setIsUpdateModalShown] = React.useState(false)
  const [initialData, setInitialData] = React.useState<IField>({
    name: "",
    price: 0,
    description: "",
    type: 5,
  })

  const openCreateModal = () => {
    setIsCreateModalShown(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalShown(false)
  }

  const openUpdateModal = () => {
    setIsUpdateModalShown(true)
  }

  const closeUpdateModal = () => {
    setIsUpdateModalShown(false)
  }

  const value = {
    isCreateModalShown,
    setIsCreateModalShown,
    openCreateModal,
    closeCreateModal,
    isUpdateModalShown,
    setIsUpdateModalShown,
    openUpdateModal,
    closeUpdateModal,
    initialData,
    setInitialData,
  }
  return (
    <FieldManagementContext.Provider value={value}>
      {children}
      {isCreateModalShown && (
        <CreateFieldModal visible={isCreateModalShown} onClose={closeCreateModal} />
      )}
      {isUpdateModalShown && (
        <UpdateFieldModal visible={isUpdateModalShown} onClose={closeUpdateModal} />
      )}
    </FieldManagementContext.Provider>
  )
}

export const useFieldManagementContext = () => useContext(FieldManagementContext)
