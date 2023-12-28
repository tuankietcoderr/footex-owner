import { getBranchInvoices } from "@/actions/invoice-actions"
import IInvoice from "@/interface/IInvoice"
import { ParamsProps } from "@/types/params"
import React from "react"
import AllInvoices from "./_components/all-invoices"

const page = async ({ params: { id } }: ParamsProps) => {
  const { success, data } = await getBranchInvoices(id)
  if (!success) return <div>error</div>
  const invoices = data as IInvoice[]
  return (
    <div>
      <AllInvoices invoices={invoices} />
    </div>
  )
}

export default page
