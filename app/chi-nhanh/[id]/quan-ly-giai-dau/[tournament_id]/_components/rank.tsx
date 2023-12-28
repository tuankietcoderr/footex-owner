"use client"
import AppAvatar from "@/components/app-avatar"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import ITeam from "@/interface/ITeam"
import React, { useCallback } from "react"

type Props = {
  teams: ITeam[]
}

const RankBoard = ({ teams = [] }: Props) => {
  const headers = ["Logo", "Tên đội", "Điểm"]
  const columns: ColumnProps<ITeam>[] = [
    {
      headRef: "Logo",
      render: (team) => (
        <div className="flex justify-center">
          <AppAvatar src={team.logo} alt={team.name} />
        </div>
      ),
    },
    {
      headRef: "Tên đội",
      render: (team) => team.name,
    },
    {
      headRef: "Số lượng thành viên",
      render: (team) => team.members?.length,
    },
    {
      headRef: "Giải đấu đã tham gia",
      render: (team) => team.jointTournaments?.length,
    },
    {
      headRef: "Hành động",
      render: (team) => (
        <div>
          <Button
            onClick={() => handleDeleteTeam(team?._id!)}
            className="text-destructive"
            variant={"ghost"}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]
  const [_teams, setTeams] = React.useState<ITeam[]>(teams)

  function handleDeleteTeam(teamId: string) {
    setTeams((prev) => prev.filter((team) => team._id !== teamId))
  }

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTeams(
        teams.filter((team) => team.name.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    },
    [teams]
  )

  const onReset = () => {
    setTeams(teams)
  }

  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <h4 className="font-semibold">Những đội đã tham gia giải đấu</h4>
      <Separator />
      <div className="mt-2 flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm đội..." onChange={onSearch} />
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
      </div>
      <Table data={_teams} headers={headers} columns={columns} className="mt-2 border" />
    </div>
  )
}

export default RankBoard
