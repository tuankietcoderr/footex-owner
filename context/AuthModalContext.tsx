"use client"
// import NotOwner from "@/components/modal/not-owner"
import useOwnerStore from "@/store/useOwnerStore"
import { redirect, usePathname } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useState } from "react"
import dynamic from "next/dynamic"
import LoadingOverlay from "@/components/loading-overlay"
import ROUTE from "@/constants/route"

const NotOwner = dynamic(() => import("@/components/modal/not-owner"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})
interface IAuthModalContext {
  visible: boolean
  openModal: () => boolean
  closeModal: () => void
  fallbackUrl: string
  setFallbackUrl: (url: string) => void
  mustAuthorize: () => boolean
}

export const AuthModalContext = createContext<IAuthModalContext>({
  visible: false,
  openModal: () => false,
  closeModal: () => {},
  fallbackUrl: "/",
  setFallbackUrl: () => {},
  mustAuthorize: () => false,
})

export const AuthModalProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState<string>("/")
  const { owner } = useOwnerStore()
  const pathName = usePathname()
  const openModal = (): boolean => {
    if (visible) return false
    if (owner === null) {
      setVisible(true)
      setFallbackUrl(pathName)
      return true
    }
    return false
  }

  const closeModal = () => {
    setVisible(false)
  }

  const mustAuthorize = () => {
    return openModal()
  }

  return (
    <AuthModalContext.Provider
      value={{
        visible,
        openModal,
        closeModal,
        fallbackUrl,
        setFallbackUrl,
        mustAuthorize,
      }}
    >
      {children}
      {visible && <NotOwner isOpen={visible} onClose={closeModal} />}
    </AuthModalContext.Provider>
  )
}

export const useAuthModalContext = () => {
  return useContext(AuthModalContext)
}
