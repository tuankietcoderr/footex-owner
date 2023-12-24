import { getFieldsOfBranch } from "@/actions/field-actions"
import IField from "@/interface/IField"
import { ParamsProps } from "@/types/params"
import React from "react"
import AllFields from "./_components/all-fields"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getFieldsOfBranch(id)
  if (!success) return <div>error</div>
  const fields = data as IField[]
  return (
    <div>
      <AllFields fields={fields} branchId={id} />
    </div>
  )
}

export default page
