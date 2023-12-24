import HiddenPerson from "@/illustrations/hidden-person"
import { Plus } from "lucide-react"
import HelloCard from "@/components/hello-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"

type Props = {
  branchId: string
}

const HelloDashboard = async ({ branchId }: Props) => {
  const {
    session: { owner },
  } = await getSession()
  return (
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
          </p>
          <HiddenPerson
            fill="var(--primary)"
            className="absolute -right-6 bottom-4 z-[1] w-32 fill-primary dark:opacity-50"
          />
        </div>
      }
      footer={
        <>
          <Button asChild>
            <Link href={ROUTE.BRANCH.FIELD.CREATE.replace(":branchId", branchId)}>
              <Plus size={20} />
              <span className="ml-2">Thêm sân</span>
            </Link>
          </Button>
          <Button variant={"outline"} asChild>
            <Link href={ROUTE.BRANCH.TOURNAMENT.CREATE.replace(":branchId", branchId)}>
              <Plus size={20} />
              <span className="ml-2">Thêm giải đấu</span>
            </Link>
          </Button>
        </>
      }
    />
  )
}

export default HelloDashboard
