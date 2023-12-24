import React from "react"
import UpdateBranchForm from "./_components/update-branch-form"
import { ParamsProps } from "@/types/params"
import { getBranchById } from "@/actions/branch-actions"
import IBranch from "@/interface/IBranch"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, message, data } = await getBranchById(id)
  if (!success) {
    return <div>{message}</div>
  }
  const branch = data as IBranch
  return (
    <div>
      <UpdateBranchForm branch={branch} />
    </div>
  )
}

export default page
