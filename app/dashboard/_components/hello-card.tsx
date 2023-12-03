"use client"
import { useFieldManagementContext } from "@/context/FieldManagementContext"
import HiddenPerson from "@/illustrations/hidden-person"
import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import { Plus } from "lucide-react"
import { useTournamentManagementContext } from "@/context/TournamentManagementContext"
import BlurElement from "@/components/blur-element"
import HelloCard from "@/components/hello-card"
import { Button } from "@/components/ui/button"

const HelloDashboard = () => {
  const { owner } = useOwnerStore()
  const { branch } = useBranchStore()
  const { openCreateModal: openCreateFieldModal } = useFieldManagementContext()
  const { openCreateModal: openCreateTournamentModal } = useTournamentManagementContext()
  return (
    <BlurElement>
      <HelloCard
        title={
          <p className="z-[2]">
            Xin chào <strong className="underline">{owner?.name}</strong>!
          </p>
        }
        content={
          <div className="flex justify-between">
            <p className="z-[2]">
              Chào mừng bạn đến với trang quản lý dành cho{" "}
              <strong className="underline">Chủ sân bóng</strong>!
              <br />
              {branch && (
                <>
                  Bạn đang quản lý sân bóng <strong className="underline">{branch?.name}</strong>
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
            <Button onClick={openCreateFieldModal}>
              <Plus size={20} />
              <span className="ml-2">Thêm sân</span>
            </Button>
            <Button variant={"outline"} onClick={() => openCreateTournamentModal()}>
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
