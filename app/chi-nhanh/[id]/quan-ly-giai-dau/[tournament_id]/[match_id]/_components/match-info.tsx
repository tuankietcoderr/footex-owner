"use client"
import ServerImage from "@/components/server-image"
import { Button } from "@/components/ui/button"
import IGoalDetail from "@/interface/IGoalDetail"
import IMatch from "@/interface/IMatch"
import ITeam from "@/interface/ITeam"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import React from "react"
import Goals from "./goals"
import Fines from "./fines"
import ICardFine from "@/interface/ICardFine"
import IField from "@/interface/IField"
import AppAvatar from "@/components/app-avatar"
import ROUTE from "@/constants/route"

type Props = {
  match: IMatch
}

const MatchInfo = ({ match }: Props) => {
  const leftTeam = match.leftTeam as ITeam
  const rightTeam = match.rightTeam as ITeam
  const leftTeamGoals = match.leftTeamGoals as IGoalDetail[]
  const rightTeamGoals = match.rightTeamGoals as IGoalDetail[]
  const field = match.field as IField
  const { id } = useParams<{
    id: string
  }>()

  const tabs = [
    {
      title: "Bàn thắng",
      tab: "goals",
    },
    {
      title: "Thẻ phạt",
      tab: "penalties",
    },
  ]

  const searchParams = useSearchParams()
  const selectedTab = searchParams.get("tab") || "goals"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-evenly">
        <div className="space-y-2">
          <ServerImage
            src={leftTeam.logo}
            alt={leftTeam.name}
            className="w-40"
            width={400}
            height={400}
          />
          <h3 className="text-center text-lg font-bold">{leftTeam.name}</h3>
        </div>
        <p className="text-6xl">{leftTeamGoals.length}</p>
        <p className="text-xl font-semibold text-muted-foreground">VS</p>
        <p className="text-6xl">{rightTeamGoals.length}</p>
        <div className="space-y-2">
          <ServerImage
            src={rightTeam.logo}
            alt={rightTeam.name}
            className="w-40"
            width={400}
            height={400}
          />
          <h3 className="text-center text-lg font-bold">{rightTeam.name}</h3>
        </div>
      </div>
      <Link
        href={ROUTE.BRANCH.FIELD.ID.replace(":branchId", id).replace(":id", field?._id!)}
        className="flex items-center gap-2 rounded-md border p-4"
        title="Sân"
      >
        <AppAvatar src={field?.image!} alt={field.name} className="" />
        <p className="">{field?.name}</p>
      </Link>
      <div className="space-x-2">
        {tabs.map((tab) => (
          <Button
            variant={"outline"}
            key={tab.tab}
            className={cn(selectedTab === tab.tab && "border-primary text-primary")}
            asChild
          >
            <Link href={`?tab=${tab.tab}`} scroll={false} replace>
              {tab.title}
            </Link>
          </Button>
        ))}
      </div>
      <div>
        {selectedTab === "goals" ? (
          <Goals
            goals={[...leftTeamGoals, ...rightTeamGoals].sort(
              (a, b) => b.scoreAtMinute - a.scoreAtMinute
            )}
            leftTeam={leftTeam}
            rightTeam={rightTeam}
            matchId={match?._id!}
          />
        ) : (
          <Fines
            fines={match.fines as ICardFine[]}
            leftTeam={leftTeam}
            rightTeam={rightTeam}
            matchId={match?._id!}
          />
        )}
      </div>
    </div>
  )
}

export default MatchInfo
