"use client"
import React from "react"
import { ArrowUp } from "lucide-react"
import StatisticItem from "./statistic-item"
import RatingStar from "@/components/rating-star"

const Rating = () => {
  return (
    <StatisticItem
      wrapperClassName="col-span-2"
      title="Đánh giá tổng quan"
      footer={
        <div className="flex items-center gap-2">
          <ArrowUp className="text-green-500" />
          <span className="text-sm font-semibold text-green-500">+1.2%</span>
        </div>
      }
    >
      <RatingStar total={5} rating={2} size={40} />
      <p className="mt-2">
        <span className="text-xl font-semibold">100</span> đánh giá
      </p>
    </StatisticItem>
  )
}

export default Rating
