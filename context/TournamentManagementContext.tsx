"use client"
import React, { createContext, useContext } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"
import ITournament from "@/interface/ITournament"

const CreateTournamentModal = dynamic(() => import("@/components/modal/create/create-tournament"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})

interface ITournamentManagementContext {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openCreateModal: (data?: ITournament) => void
  closeCreateModal?: () => void
  initialData: ITournament
  setInitialData: React.Dispatch<React.SetStateAction<ITournament>>
}

export const TournamentManagementContext = createContext<ITournamentManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
  openCreateModal: () => {},
  initialData: {} as ITournament,
  setInitialData: () => {},
})

export const TournamentManagementProvider = ({ children }: React.PropsWithChildren) => {
  const [isCreateModalShown, setIsCreateModalShown] = React.useState(false)
  const [initialData, setInitialData] = React.useState<ITournament>({} as ITournament)

  const openCreateModal = (data?: ITournament) => {
    setIsCreateModalShown(true)
    data && setInitialData(data)
  }

  const closeCreateModal = () => {
    setIsCreateModalShown(false)
  }

  const value = {
    isCreateModalShown,
    setIsCreateModalShown,
    openCreateModal,
    closeCreateModal,
    initialData,
    setInitialData,
  }
  return (
    <TournamentManagementContext.Provider value={value}>
      {children}
      {isCreateModalShown && (
        <CreateTournamentModal visible={isCreateModalShown} onClose={closeCreateModal} />
      )}
    </TournamentManagementContext.Provider>
  )
}

export const useTournamentManagementContext = () => {
  return useContext(TournamentManagementContext)
}
