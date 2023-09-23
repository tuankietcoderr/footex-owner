import Ball from "@/illustrations/ball"
import KidFootball from "@/illustrations/kid-football"
import HelloCard from "../hello-card"

const ActionCreate = () => {
  return (
    <HelloCard
      title="Tạo sân bóng của bạn"
      content={
        <div className="flex">
          <p className="z-[2]">
            Chào mừng bạn đến với trang quản lý <strong className="underline">sân bóng</strong>!
          </p>
          <Ball className="absolute -bottom-4 left-6 z-[1] w-20 fill-primary dark:opacity-50" />
          <Ball className="absolute bottom-4 left-40 z-[1] w-10 fill-primary dark:opacity-50" />
          <KidFootball
            fill="var(--primary)"
            className="absolute bottom-4 right-4 z-[1] w-60 fill-primary dark:opacity-50"
          />
        </div>
      }
    />
  )
}

export default ActionCreate
