"use client"
import React, { createContext, useContext } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import { useParams } from "next/navigation"

const AddBookedGuestToFieldModal = dynamic(
  () => import("@/components/modal/create/add-booked-guest-to-field"),
  {
    ssr: false,
    loading: () => <LoadingOverlay />,
  }
)

interface IFieldBookedQueueCreate {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openCreateModal: (data: IFieldBookedQueue) => void
  closeCreateModal: () => void
}

interface IFieldBookedQueueUpdate {
  isUpdateModalShown: boolean
  setIsUpdateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openUpdateModal: () => void
  closeUpdateModal: () => void
  initialData: IFieldBookedQueue
  setInitialData: React.Dispatch<React.SetStateAction<IFieldBookedQueue>>
}

type IFieldBookedQueueManagementContext = IFieldBookedQueueCreate & IFieldBookedQueueUpdate

export const FieldBookedQueueManagementContext = createContext<IFieldBookedQueueManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
  openCreateModal: () => {},
  closeCreateModal: () => {},
  isUpdateModalShown: false,
  setIsUpdateModalShown: () => {},
  openUpdateModal: () => {},
  closeUpdateModal: () => {},
  initialData: {
    bookedBy: "",
    startAt: new Date(),
    endAt: new Date(),
  },
  setInitialData: () => {},
})

export const FieldBookedQueueManagementProvider = ({ children }: React.PropsWithChildren) => {
  const [isCreateModalShown, setIsCreateModalShown] = React.useState(false)
  const [isUpdateModalShown, setIsUpdateModalShown] = React.useState(false)
  const [initialData, setInitialData] = React.useState<IFieldBookedQueue>({
    bookedBy: "",
    startAt: new Date(),
    endAt: new Date(),
  })

  const { field_id } = useParams<{
    field_id: string
  }>()

  const openCreateModal = (data: IFieldBookedQueue) => {
    setIsCreateModalShown(true)
    setInitialData(data)
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
    <FieldBookedQueueManagementContext.Provider value={value}>
      {children}
      {isCreateModalShown && (
        <AddBookedGuestToFieldModal
          visible={isCreateModalShown}
          onClose={closeCreateModal}
          field={field_id}
        />
      )}
      {/* {isUpdateModalShown && (
        <UpdateFieldModal visible={isUpdateModalShown} onClose={closeUpdateModal} />
      )} */}
    </FieldBookedQueueManagementContext.Provider>
  )
}

export const useFieldBookedQueueManagementContext = () =>
  useContext(FieldBookedQueueManagementContext)
