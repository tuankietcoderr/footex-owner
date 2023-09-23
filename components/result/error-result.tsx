import Error from "@/illustrations/error"
import React from "react"

const ErrorResult = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <Error fill="var(--primary)" className="fill-primary dark:fill-secondary" />
        <p className="text-center">Có lỗi xảy ra</p>
      </div>
    </div>
  )
}

export default ErrorResult
