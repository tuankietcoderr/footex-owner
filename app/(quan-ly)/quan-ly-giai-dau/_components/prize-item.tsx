import BlurElement from "@/components/blur-element"
import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IPrize from "@/interface/IPrize"
import { toDot } from "@/lib/converter"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const PrizeItem = ({ name, _id, image, value, winners = [] }: IPrize) => {
  return (
    <BlurElement visible={_id === undefined}>
      <div className="h-fit overflow-hidden rounded-lg border border-border shadow-sm">
        <Card className="border-none shadow-none">
          <CardHeader className="grid place-items-center">
            {image ? (
              <ServerImage
                src={image}
                width={300}
                height={300}
                alt={name}
                className="h-[10rem]  w-[10rem] rounded-full bg-slate-200 object-cover"
              />
            ) : (
              <FootballGoalSemi fill="var(--primary)" className="fill-primary" />
            )}
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{name}</p>
            <CardDescription>
              <b>{winners.length}</b> đội đã giành được giải thưởng này
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-between">
            <CardDescription className="font-semibold text-red-400">
              {toDot(value ?? 0)}VND
            </CardDescription>
            <Button
              variant={"link"}
              className="p-0 transition-transform sm:hover:scale-105"
              asChild
            >
              <Link href={`${ROUTE.QUAN_LY_GIAI_DAU.GIAI_THUONG.ID.replace(":id", _id || "")}`}>
                Chi tiết <ArrowRight size={20} />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </BlurElement>
  )
}

export default PrizeItem
