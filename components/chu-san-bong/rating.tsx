"use client"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import RatingStar from "../rating-star"
import { ArrowUp } from "lucide-react"

const Rating = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Đánh giá tổng quan</CardTitle>
      </CardHeader>
      <CardContent>
        <RatingStar total={5} rating={2} size={40} />
        <p className="mt-2">
          <span className="text-xl font-semibold">100</span> đánh giá
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <ArrowUp className="text-green-500" />
          <span className="text-sm font-semibold text-green-500">+1.2%</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Rating
