"use client"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import HiddenPerson from "@/illustrations/hidden-person"
import useBigFieldStore from "@/store/useBigFieldStore"
import useUserStore from "@/store/useUserStore"
import { Plus } from "lucide-react"
import BlurElement from "../blur-element"
import HelloCard from "../hello-card"
import { Button } from "../ui/button"

const HelloDashboard = () => {
  const { user } = useUserStore()
  const { bigField } = useBigFieldStore()
  const { openCreateModal } = useFieldManagementContext()
  return (
    <BlurElement>
      <HelloCard
        title={
          <p className="z-[2]">
            Xin chào <strong className="underline">{user?.name}</strong>!
          </p>
        }
        content={
          <div className="flex justify-between">
            <p className="z-[2]">
              Chào mừng bạn đến với trang quản lý dành cho{" "}
              <strong className="underline">Chủ sân bóng</strong>!
              <br />
              {bigField && (
                <>
                  Bạn đang quản lý sân bóng <strong className="underline">{bigField?.name}</strong>
                </>
              )}
            </p>
            <HiddenPerson
              fill="var(--primary)"
              className="absolute -right-6 bottom-4 z-[1] w-32 fill-primary dark:opacity-50"
            />
          </div>
        }
        footer={
          <>
            <Button onClick={openCreateModal}>
              <Plus size={20} />
              <span className="ml-2">Thêm sân</span>
            </Button>
            <Button variant={"outline"}>
              <Plus size={20} />
              <span className="ml-2">Thêm giải đấu</span>
            </Button>
          </>
        }
      />
    </BlurElement>
  )
}

export default HelloDashboard
