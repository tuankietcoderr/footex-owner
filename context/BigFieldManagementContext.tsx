"use client"
// import CreateOrg from "@/components/modal/create-org"
import { COMMON } from "@/constants/common"
import useBigFieldStore from "@/store/useBigFieldStore"
import useFieldStore from "@/store/useFieldStore"
import React, { createContext, useState, useContext, useEffect } from "react"
import dynamic from "next/dynamic"

const CreateOrg = dynamic(() => import("@/components/modal/create-org"), { ssr: false })

interface IBigFieldManagementContext {
  isCreateModalShown: boolean
  setIsCreateModalShown: React.Dispatch<React.SetStateAction<boolean>>
  openModal?: () => void
  closeModal?: () => void
}

export const BigFieldManagementContext = createContext<IBigFieldManagementContext>({
  isCreateModalShown: false,
  setIsCreateModalShown: () => {},
})

export const BigFieldManagementProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { bigFields, setBigField, bigField } = useBigFieldStore()
  const { getFieldsOfOrg, reset } = useFieldStore()
  const [isCreateModalShown, setIsCreateModalShown] = useState(false)
  useEffect(() => {
    if (bigFields && bigFields.length > 0 && !bigField) {
      const lastOrgId = localStorage.getItem(COMMON.LAST_ORG_ID)
      const firstOrg = bigFields[0]
      if (lastOrgId) {
        const lastOrg = bigFields.find((org) => org?._id === lastOrgId)
        if (lastOrg) {
          setBigField(lastOrg)
          return
        } else {
          setBigField(firstOrg)
        }
      } else {
        setBigField(firstOrg)
      }
    } else {
      localStorage.removeItem(COMMON.LAST_ORG_ID)
    }
  }, [bigFields])

  useEffect(() => {
    if (bigField) {
      localStorage.setItem(COMMON.LAST_ORG_ID, bigField?._id!)
      getFieldsOfOrg(bigField?._id!)
    }
  }, [bigField])

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
    <BigFieldManagementContext.Provider value={value}>
      {children}
      <CreateOrg visible={isCreateModalShown} onClose={closeModal} />
    </BigFieldManagementContext.Provider>
  )
}

export const useBigFieldManagementContext = () => {
  return useContext(BigFieldManagementContext)
}
