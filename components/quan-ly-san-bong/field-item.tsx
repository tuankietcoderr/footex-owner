"use client"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IField, { EFieldStatus } from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import RatingStar from "../rating-star"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card"
import BlurElement from "../blur-element"

const FieldItem = ({ name, _id, description, status, price, type, image }: IField) => {
  return (
    <BlurElement visible={_id === undefined}>
      <div className="min-w-[300px] rounded-lg border border-border shadow-sm">
        <div className="">
          {image ? (
            <Image
              src={image}
              width={400}
              height={400}
              loader={({ src }) => src}
              alt={name}
              className="w-full rounded-t-md object-cover"
            />
          ) : (
            <FootballGoalSemi fill="var(--primary)" className="fill-primary" />
          )}
        </div>
        <div>
          <Card className="border-none shadow-none">
            <CardHeader>
              <RatingStar rating={2} />
            </CardHeader>
            <CardContent>
              <CardDescription>
                {name && <p className="text-xl font-semibold">{name}</p>}
                {status === EFieldStatus.ACTIVE ? (
                  <span className="text-green-500">Đang trống</span>
                ) : (
                  <span className="text-red-400">Đang được sử dụng</span>
                )}
                <p>
                  Sân <b>{type}</b>
                </p>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <CardDescription className="font-semibold text-red-400">
                {toDot(price ?? 0)}VND/giờ
              </CardDescription>
              <Button variant={"link"} className="transition-transform sm:hover:scale-105" asChild>
                <Link href={`/quan-ly-san/${_id}`}>
                  Chi tiết <ArrowRight size={20} />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </BlurElement>
  )
}

export default FieldItem
