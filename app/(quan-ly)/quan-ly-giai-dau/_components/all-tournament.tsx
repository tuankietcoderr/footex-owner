import BigCalendar from "@/components/big-calendar"
import { useTournamentManagementContext } from "@/context/TournamentManagementContext"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import useTournamentStore from "@/store/useTournamentStore"
import { colorizeTournamentStatus } from "@/utils/status"
import dynamic from "next/dynamic"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Event, SlotInfo } from "react-big-calendar"

const TournamentItem = dynamic(() => import("./tournament-item").then((mod) => mod.default), {
  ssr: false,
})

const AllTournament = () => {
  const { tournaments } = useTournamentStore()
  const { openCreateModal } = useTournamentManagementContext()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filter = searchParams.get("filter") ?? "all"
  const setFilter = useCallback(
    (filter: string) => {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set("filter", filter)
      router.replace(`${pathname}?${newParams.toString()}`)
    },
    [searchParams, pathname, router]
  )
  const filteredTournaments = useMemo(
    () => tournaments?.filter((tournament) => tournament.status === filter || filter === "all"),
    [filter, tournaments]
  )
  const tournamentStatuses = useMemo(() => Object.values(ETournamentStatus), [])

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events =
    filteredTournaments &&
    (filteredTournaments.map((tournament) => ({
      resource: tournament,
      start: new Date(tournament.startAt),
      end: new Date(tournament.endAt),
      title: tournament.name,
    })) as Event[])

  const onSelectedSlot = (info: SlotInfo) => {
    openCreateModal({
      startAt: info.start,
      endAt: info.end,
      name: "",
      description: "",
    })
  }

  return (
    <div className="rounded-md border p-4 shadow-sm">
      <BigCalendar
        events={events || []}
        onSelectSlot={onSelectedSlot}
        eventPropGetter={(event) => {
          const fieldBookedQueue = event.resource as ITournament
          return {
            style: {
              backgroundColor: colorizeTournamentStatus(fieldBookedQueue.status!, true),
            },
          }
        }}
        views={["month"]}
        onSelectEvent={(event) => {
          setSelectedEvent(event.resource._id)
        }}
        components={{
          month: {
            event: ({ event }) => (
              <TournamentItem
                tournament={event.resource as ITournament}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
          week: {
            event: ({ event }) => (
              <TournamentItem
                tournament={event.resource as ITournament}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
          day: {
            event: ({ event }) => (
              <TournamentItem
                tournament={event.resource as ITournament}
                isSelected={selectedEvent === event.resource._id}
                setIsSelected={setSelectedEvent}
              />
            ),
          },
        }}
      />
    </div>
  )
}

export default AllTournament
