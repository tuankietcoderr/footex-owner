"use client"
import { deleteTournament } from "@/actions/tournament-actions"
import UpdateTournamentModal from "@/components/modal/update-tournament-info-modal"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ROUTE from "@/constants/route"
import IPrize from "@/interface/IPrize"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { formatVietnameseDate } from "@/lib/date"
import { vilizeTournamentStatus } from "@/utils/status"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect } from "react"
import toast from "react-hot-toast"

type Props = {
  tournaments: ITournament[]
}

const AllTournaments = ({ tournaments }: Props) => {
  const [_tournaments, setTournaments] = React.useState<ITournament[]>(tournaments)

  useEffect(() => {
    setTournaments(tournaments)
  }, [tournaments])

  const tableHeaders = [
    "Tên giải đấu",
    "Giải thưởng",
    "Thời gian diễn ra",
    "Trạng thái",
    "Hành động",
  ]

  const tableColumns: ColumnProps<ITournament>[] = [
    {
      headRef: "Tên giải đấu",
      render: (row: ITournament) => row.name,
    },
    {
      headRef: "Giải thưởng",
      render: (row: ITournament) => (row.prize as IPrize).name,
    },
    {
      headRef: "Thời gian diễn ra",
      render: (row: ITournament) =>
        formatVietnameseDate(row.startAt!, "dd/MM/yyyy") +
        " - " +
        formatVietnameseDate(row.endAt!, "dd/MM/yyyy"),
    },
    {
      headRef: "Trạng thái",
      render: (row: ITournament) => vilizeTournamentStatus(row.status!),
    },
    {
      headRef: "Hành động",
      render: (row: ITournament) => (
        <div>
          <Button variant={"ghost"} className="text-primary" asChild>
            <Link
              href={ROUTE.BRANCH.TOURNAMENT.ID.replace(":branchId", id).replace(":id", row?._id!)}
            >
              Xem
            </Link>
          </Button>
          {row.status === ETournamentStatus.UPCOMING && (
            <UpdateTournamentModal
              trigger={
                <Button variant={"ghost"} className="text-secondary-foreground">
                  Sửa
                </Button>
              }
              initialData={{ ...row }}
              tournamentId={row?._id!}
            />
          )}
          {row.status === ETournamentStatus.UPCOMING && (
            <Button
              variant={"ghost"}
              className="text-destructive"
              onClick={() => onDeleteTournament(row._id!)}
            >
              Xóa
            </Button>
          )}
        </div>
      ),
    },
  ]

  async function onDeleteTournament(id: string) {
    toast.loading("Đang xóa giải đấu...", {
      duration: Infinity,
    })
    const { success, message } = await deleteTournament(id)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const { id } = useParams<{
    id: string
  }>()

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTournaments(
        tournaments.filter((tournament) =>
          tournament.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
    },
    [tournaments]
  )

  const onChangeStatus = useCallback(
    (status: ETournamentStatus) => {
      setTournaments(tournaments.filter((tournament) => tournament.status === status))
    },
    [tournaments]
  )

  const onReset = () => setTournaments(tournaments)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm giải đấu..." onChange={onSearch} />
        <Select onValueChange={onChangeStatus}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {Object.values(ETournamentStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {vilizeTournamentStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
        <Button asChild>
          <Link href={ROUTE.BRANCH.TOURNAMENT.CREATE.replace(":branchId", id)}>
            Tạo giải đấu mới
          </Link>
        </Button>
      </div>
      <Table
        headers={tableHeaders}
        columns={tableColumns}
        data={_tournaments}
        className="border shadow-sm"
      />
    </div>
  )
}

export default AllTournaments
