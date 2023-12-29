"use client"

import PrizeItem from "@/components/item/prize-item"
import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import IBranch from "@/interface/IBranch"
import IPrize from "@/interface/IPrize"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { toAddress } from "@/lib/converter"
import { formatVietnameseDate } from "@/lib/date"
import { Circle, Clock12, Clock7, MapPin, Trophy, Users } from "lucide-react"
import UpdateTournamentStatus from "./update-tournament-status"
import UpdateTournamentModal from "@/components/modal/update-tournament-info-modal"
import { Button } from "@/components/ui/button"

const TournamentMainInfo = (tournament: ITournament) => {
  const { name, branch, prize, images, startAt, endAt, teams, status, description } = tournament
  const _prize = (prize ?? {}) as IPrize
  const _branch = (branch ?? {}) as IBranch
  return (
    <div className="grid grid-cols-[18rem_auto] space-x-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={images?.[0] || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[14rem] w-full object-cover p-2"
        />
      </div>
      <div className="flex justify-between rounded-md border p-4 shadow-sm">
        <div className="flex flex-col justify-between space-y-2 ">
          <h1 className="text-4xl font-bold">{name}</h1>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Circle size={16} />
              <UpdateTournamentStatus status={status!} tournamentId={tournament?._id!} />
            </div>
            <div className="flex space-x-2">
              <MapPin size={16} />
              <CardDescription className="flex-1">{toAddress({ ..._branch })}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Users size={16} />
              <CardDescription>
                <b>{teams?.length ?? 0}</b> đội đã tham gia thi đấu
              </CardDescription>
            </div>
            <div className="flex flex-1 space-x-2">
              <Clock7 size={16} />
              <CardDescription>
                {formatVietnameseDate(new Date(startAt), "dd/MM/yyyy")}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Clock12 size={16} />
              <CardDescription>
                {formatVietnameseDate(new Date(endAt), "dd/MM/yyyy")}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Trophy size={16} />
              <div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <CardDescription className="cursor-pointer font-semibold underline">
                      {_prize?.name}
                    </CardDescription>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div>
                      <PrizeItem {..._prize} />
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>
          </div>
        </div>
        {status === ETournamentStatus.UPCOMING && (
          <UpdateTournamentModal
            initialData={{ ...tournament, image: images?.[0] ?? "" }}
            tournamentId={tournament?._id!}
            trigger={<Button className="self-end">Cập nhật thông tin giải đấu</Button>}
          />
        )}
      </div>
    </div>
  )
}

export default TournamentMainInfo
