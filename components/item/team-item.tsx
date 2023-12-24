import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { toAddress } from "@/lib/converter"
import { AlarmClock, ArrowRight, Gamepad, MapPin, Phone, Users } from "lucide-react"
import Link from "next/link"

const TeamItem = (team: ITeam) => {
  const { name, _id, logo, members, captain, jointTournaments } = team
  const _captain = captain as IGuest
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="grid place-items-center">
        <ServerImage
          src={logo ?? ""}
          width={400}
          height={400}
          alt={name}
          className="w-full rounded-t-md object-cover p-2"
        />
      </div>
      <Card className="flex flex-1 flex-col justify-between border-none shadow-none">
        <CardContent className="flex flex-1 flex-col gap-2">
          {name && <p className="text-xl font-semibold">{name}</p>}
          <div className="flex space-x-2">
            <MapPin size={16} />
            <CardDescription className="flex-1">{toAddress({ ..._captain })}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Users size={16} />
            <CardDescription>
              <span className="font-semibold">{members?.length || 0}</span> thành viên
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Gamepad size={16} />
            <CardDescription>
              <span className="font-semibold">{jointTournaments?.length || 0}</span> giải đấu đã
              tham gia
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeamItem
