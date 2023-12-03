import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useToast } from "@/components/ui/use-toast"
import ROUTE from "@/constants/route"
import FootballGoalSemi from "@/illustrations/football-goal-semi"
import IPrize from "@/interface/IPrize"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import useTournamentStore from "@/store/useTournamentStore"
import { colorizeTournamentStatus, vilizeTournamentStatus } from "@/utils/status"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import PrizeItem from "./prize-item"

type Props = {
  tournament: ITournament
  isSelected?: boolean
  setIsSelected?: React.Dispatch<React.SetStateAction<string | null>>
}

const TournamentItem = ({ tournament, isSelected, setIsSelected }: Props) => {
  const { name, _id, images = [], teams = [], startAt, endAt, prize, status } = tournament
  const _prize = (prize ?? {}) as IPrize
  const { deleteTournament } = useTournamentStore()
  const { toast } = useToast()

  const handleDelete = async () => {
    await deleteTournament(_id!)
      .then(() => {
        toast({
          title: "Xóa thành công",
        })
      })
      .catch((err) => {
        toast({
          title: "Xóa thất bại",
          description: err,
        })
      })
  }

  return (
    <Dialog
      open={isSelected}
      onOpenChange={(v) => {
        if (!v) {
          setIsSelected?.(null)
        }
      }}
    >
      <DialogTrigger>{name}</DialogTrigger>
      <DialogContent className="overflow-hidden rounded-lg border border-border shadow-sm">
        <div>
          <Card className="border-none shadow-none">
            <CardHeader className="grid place-items-center">
              {images?.length > 0 ? (
                <ServerImage
                  src={images[0]}
                  width={300}
                  height={300}
                  alt={name}
                  className="h-[10rem]  w-[10rem] rounded-full bg-slate-200 object-contain "
                />
              ) : (
                <FootballGoalSemi fill="var(--primary)" className="fill-primary" />
              )}
            </CardHeader>
            <CardContent>
              <CardDescription className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{name}</p>
                <p className={cn("text-xs", colorizeTournamentStatus(status!))}>
                  {vilizeTournamentStatus(status!)}
                </p>
                <p>
                  <b>{teams?.length ?? 0}</b> đội đã tham gia thi đấu
                </p>
                <p className="text-xs">
                  Diễn ra từ ngày{" "}
                  <span className="font-semibold">
                    {formatVietnameseDate(new Date(startAt), "dd/MM/yyyy")}
                  </span>{" "}
                  đến ngày{" "}
                  <span className="font-semibold">
                    {formatVietnameseDate(new Date(endAt), "dd/MM/yyyy")}
                  </span>
                </p>
              </CardDescription>
            </CardContent>
            <CardFooter className="flex-col items-start">
              <CardDescription>
                Giải thưởng:{" "}
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="cursor-pointer font-semibold underline">{_prize?.name}</span>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div>
                      <PrizeItem {..._prize} />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </CardDescription>
              <div className="flex items-center gap-2 self-end">
                {status === ETournamentStatus.UPCOMING && (
                  <Button
                    variant="destructive"
                    className="transition-transform sm:hover:scale-105"
                    onClick={handleDelete}
                  >
                    Xóa
                  </Button>
                )}
                <Button className="transition-transform sm:hover:scale-105" asChild>
                  <Link href={`${ROUTE.QUAN_LY_GIAI_DAU.ID.replace(":id", _id || "")}`}>
                    Chi tiết <ArrowRight size={20} />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TournamentItem
