import { ParamsProps } from "@/types/params"
import React from "react"
import CreateGuestAccount from "./_components/create-guest-account"

const page = ({ params: { id }, searchParams }: ParamsProps) => {
  return (
    <div className="flex justify-center">
      <CreateGuestAccount />
    </div>
  )
}

export default page
