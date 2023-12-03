"use client"
import BlurElement from "@/components/blur-element"
import RatingStar from "@/components/rating-star"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IField from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { colorizeFieldStatus, vilizeFieldStatus } from "@/utils/status"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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
              {name && <p className="text-xl font-semibold">{name}</p>}
              <span className={colorizeFieldStatus(status!)}>{vilizeFieldStatus(status!)}</span>
              <CardDescription>
                Sân <b>{type}</b>
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
