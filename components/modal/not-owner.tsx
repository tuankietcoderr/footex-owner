import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function NotOwner({ isOpen, onClose }: Props) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cảnh báo</DialogTitle>
          <DialogDescription>
            Bạn cần phải là chủ sân bóng mới có thể thực hiện chức năng này
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button asChild variant={"outline"} size={"sm"} onClick={onClose}>
            <Link href="/dang-ky">Đăng ký</Link>
          </Button>
          <Button asChild size={"sm"} onClick={onClose}>
            <Link href="/dang-nhap">Đăng nhập</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
