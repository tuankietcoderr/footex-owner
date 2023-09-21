import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import Link from "next/link"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = ({ isOpen, onClose }: Props) => {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bạn chưa đăng nhập</DialogTitle>
          <DialogDescription>Bạn cần đăng nhập để thực hiện chức năng này.</DialogDescription>
          <DialogFooter>
            <Button asChild className="float-right mt-8" variant={"outline"} onClick={onClose}>
              <Link href="/dang-ky">Đăng ký</Link>
            </Button>
            <Button asChild className="float-right mt-8" onClick={onClose}>
              <Link href="/dang-nhap">Đăng nhập</Link>
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal
