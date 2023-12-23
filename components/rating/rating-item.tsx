import IRate from "@/interface/IRate"
import React from "react"
import AppAvatar from "../app-avatar"
import IGuest from "@/interface/IGuest"
import { formatVietnameseDate } from "@/lib/date"
import RatingStar from "./rating-star"
import Link from "next/link"
import ROUTE from "@/constants/route"

const RatingItem = (rate: IRate) => {
  const { _id, rateValue, description, valuer } = rate
  const guest = valuer as IGuest
  return (
    <div className="flex space-x-2">
      <AppAvatar
        src={guest?.avatar || ""}
        alt={guest?.name}
        fallback={guest?.name?.substring(0, 2)}
      />
      <div className="space-y-2">
        <p className="text-xs">{guest.name}</p>
        <RatingStar defaultValue={rateValue} size="16" readOnly />
        <p className="text-xs font-light text-muted-foreground">
          {formatVietnameseDate(new Date(rate?.createdAt!), "HH:mm dd-MM-yyyy")}
        </p>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default RatingItem
