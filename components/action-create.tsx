import Ball from "@/illustrations/ball"
import KidFootball from "@/illustrations/kid-football"
import React from "react"
import HelloCard from "./hello-card"

type Props = {
  title: string
  rightSide?: React.ReactNode
}

const ActionCreate = ({
  title,
  rightSide = (
    <KidFootball
      fill="var(--primary)"
      className="absolute bottom-4 right-4 z-[1] w-60 fill-primary dark:opacity-50"
    />
  ),
}: Props) => {
  return (
    <HelloCard
      title={title}
      content={
        <div className="flex">
          <Ball className="absolute -bottom-4 left-6 z-[1] w-20 fill-primary dark:opacity-50" />
          <Ball className="absolute bottom-4 left-40 z-[1] w-10 fill-primary dark:opacity-50" />
          {rightSide}
        </div>
      }
    />
  )
}

export default ActionCreate
