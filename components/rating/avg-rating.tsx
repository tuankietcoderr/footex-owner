import IRate from "@/interface/IRate"
import React from "react"
import AvgRatingItem from "./avg-rating-item"

type Props = {
  rates: IRate[]
}

type StarType = "all" | "5" | "4" | "3" | "2" | "1"

const AvgRating = ({ rates }: Props) => {
  const avgRate = rates.reduce((acc, cur) => acc + cur.rateValue, 0) / rates.length
  const avgRateValue = isNaN(avgRate) ? 0 : avgRate
  const mocks = [
    {
      type: "all",
    },
    {
      type: "5",
      count: rates.filter((rate) => rate.rateValue === 5).length,
    },
    {
      type: "4",
      count: rates.filter((rate) => rate.rateValue === 4).length,
    },
    {
      type: "3",
      count: rates.filter((rate) => rate.rateValue === 3).length,
    },
    {
      type: "2",
      count: rates.filter((rate) => rate.rateValue === 2).length,
    },
    {
      type: "1",
      count: rates.filter((rate) => rate.rateValue === 1).length,
    },
  ] as {
    type: StarType
    count?: number
  }[]

  return (
    <div className="flex items-center gap-4 rounded-md border border-border p-4">
      <div className="flex flex-col items-center">
        <p>
          <span className="text-xl font-semibold">
            {avgRateValue > 0 ? avgRateValue.toFixed(1) : 0}
          </span>{" "}
          <span>trên 5</span>
        </p>
      </div>
      <div className="flex  flex-1 flex-wrap gap-2">
        {mocks.map((mock) => (
          <AvgRatingItem {...mock} key={mock.type} />
        ))}
      </div>
    </div>
  )
}

export default AvgRating
