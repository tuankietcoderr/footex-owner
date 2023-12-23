import React from "react"
import { ArrowUp } from "lucide-react"
import StatisticItem from "./statistic-item"
import RatingStar from "@/components/rating-star"
import { getObjectRates } from "@/actions/rate-actions"
import IRate, { ERate } from "@/interface/IRate"

type Props = {
  branchId: string
}

const BranchRating = async ({ branchId }: Props) => {
  const { success, data } = await getObjectRates(ERate.BRANCH, branchId)
  if (!success) return null
  const rates = (data ?? []) as IRate[]
  const avgRate = rates.reduce((acc, cur) => acc + cur.rateValue, 0) / rates.length
  const avgRateValue = isNaN(avgRate) ? 0 : avgRate
  return (
    <StatisticItem wrapperClassName="col-span-2" title="Đánh giá tổng quan">
      <RatingStar defaultValue={avgRateValue} readOnly />
      <p className="mt-2">
        <span className="text-xl font-semibold">{rates.length}</span> đánh giá
      </p>
    </StatisticItem>
  )
}

export default BranchRating
