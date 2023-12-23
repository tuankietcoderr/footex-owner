import React from "react"
import HelloDashboard from "./_components/hello"
import { ParamsProps } from "@/types/params"
import Profit from "./_components/profit"
import Transactions from "./_components/transactions"
import Revenue from "./_components/revenue"
import CustomerBook from "./_components/customer-book"
import CustomerCancel from "./_components/customer-cancel"
import RatingStar from "@/components/rating/rating-star"
import BranchRating from "./_components/branch-rating"

const page = ({ params: { id } }: ParamsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[60%_auto_auto]">
      <HelloDashboard branchId={id} />
      <Profit />
      <Transactions />
      <Revenue />
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <CustomerBook />
        <CustomerCancel />
        <BranchRating branchId={id} />
      </div>
    </div>
  )
}

export default page
