"use client"
import IRate from "@/interface/IRate"
import React, { useMemo } from "react"
import RatingItem from "./rating-item"
import { useSearchParams } from "next/navigation"

type Props = {
  rates: IRate[]
}

const AllRatings = ({ rates }: Props) => {
  const searchParams = useSearchParams()
  const filter = searchParams.get("filter") ?? "all"
  const filteredRates = useMemo(
    () =>
      rates.filter((rate) => {
        if (filter === "all") return true
        return rate.rateValue === Number(filter)
      }),
    [filter, rates]
  )
  return (
    <div>
      {filteredRates.length > 0 ? (
        <div className="mt-2 flex flex-col space-y-2">
          {filteredRates.map((rate) => (
            <RatingItem {...rate} key={rate?._id} />
          ))}
        </div>
      ) : (
        <p className="mt-2 text-center text-sm text-muted-foreground">Không có đánh giá nào</p>
      )}
    </div>
  )
}

export default AllRatings
