import { Star } from "lucide-react"
import React from "react"

type RatingStarProps = {
  rating: number
  total: number
  size?: number
}

const RatingStar = ({ rating, total = 5, size }: RatingStarProps) => {
  const staticStar = Array.from({ length: total }, (_, index) => index + 1)
  return (
    <div className="flex items-center gap-1">
      {staticStar.map((star, index) => (
        <Star
          key={index}
          fill={index <= rating ? "yellow" : "lightgray"}
          className="stroke-none"
          strokeWidth={1}
          size={size || 24}
        />
      ))}
    </div>
  )
}

export default RatingStar
