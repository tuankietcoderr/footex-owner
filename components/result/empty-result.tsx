import Empty from "@/illustrations/empty"
import React from "react"

const EmptyResult = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <Empty fill="var(--primary)" className="fill-primary dark:fill-secondary" />
        <p className="text-center">Không có gì ở đây</p>
      </div>
    </div>
  )
}

export default EmptyResult
