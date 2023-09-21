"use client"
import NotOwner from "@/components/chu-san-bong/khong-phai-chu-san"
import { EUserRole } from "@/interface/IUser"
import useUserStore from "@/store/useUserStore"
import { redirect, usePathname } from "next/navigation"
import { PropsWithChildren, createContext, useContext, useState } from "react"

interface IAuthModalContext {
  visible: boolean
  openModal: () => void
  closeModal: () => void
  fallbackUrl: string
  setFallbackUrl: (url: string) => void
  mustAuthorize: () => void
}

export const AuthModalContext = createContext<IAuthModalContext>({
  visible: false,
  openModal: () => {},
  closeModal: () => {},
  fallbackUrl: "/",
  setFallbackUrl: () => {},
  mustAuthorize: () => {},
})

export const AuthModalProvider = ({ children }: PropsWithChildren) => {
  const [visible, setVisible] = useState(false)
  const [fallbackUrl, setFallbackUrl] = useState<string>("/")
  const { user } = useUserStore()
  const pathName = usePathname()
  const openModal = () => {
    if (visible) return
    if (user === null || (user && user.role === EUserRole.GUEST)) {
      setVisible(true)
      setFallbackUrl(pathName)
    }
  }

  const closeModal = () => {
    setVisible(false)
  }

  const mustAuthorize = () => {
    openModal()
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
      <NotOwner isOpen={visible} onClose={closeModal} />
    </AuthModalContext.Provider>
  )
}

export const useAuthModalContext = () => {
  return useContext(AuthModalContext)
}
