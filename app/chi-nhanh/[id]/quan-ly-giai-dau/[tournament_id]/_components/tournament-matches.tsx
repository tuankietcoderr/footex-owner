"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import IMatch from "@/interface/IMatch"
import React, { useEffect, useRef, useState } from "react"
import CreateMatchModal from "./create-match-modal"
import IField from "@/interface/IField"
import ITeam from "@/interface/ITeam"
import BigCalendar from "@/components/big-calendar"
import { Event, SlotInfo } from "react-big-calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { formatVietnameseDate } from "@/lib/date"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { createMatch } from "@/actions/match-actions"
import AppAvatar from "@/components/app-avatar"
import { useParams, useRouter } from "next/navigation"
import ROUTE from "@/constants/route"

type Props = {
  tournamentId: string
  matches: IMatch[]
  fields: IField[]
  teams: ITeam[]
}

const formSchema = z.object({
  field: z.string().min(1, { message: "Sân bóng không được để trống" }),
  startAt: z.date().refine((v) => v > new Date(), {
    message: "Thời gian bắt đầu không được nhỏ hơn hiện tại",
  }),
  endAt: z.date().refine((v) => v > new Date(), {
    message: "Thời gian kết thúc không được nhỏ hơn hiện tại",
  }),
  leftTeam: z.string().min(1, { message: "Đội bóng không được để trống" }),
  rightTeam: z.string().min(1, { message: "Đội bóng không được để trống" }),
})

type FormSchema = z.infer<typeof formSchema>

const TournamentMatches = ({ tournamentId, matches, fields, teams }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      field: "",
      startAt: new Date(),
      endAt: new Date(),
      leftTeam: "",
      rightTeam: "",
    },
  })

  const events = matches.map((match) => ({
    title: (
      <div className="flex items-center space-x-2">
        <AppAvatar src={(match?.leftTeam as ITeam).logo} alt={(match?.leftTeam as ITeam).name} />
        <span>vs</span>
        <AppAvatar src={(match?.rightTeam as ITeam).logo} alt={(match?.rightTeam as ITeam).name} />
      </div>
    ),
    start: new Date(match.startAt),
    end: new Date(match.endAt),
    resource: match,
  })) as Event[]

  const [event, setEvent] = useState<Event | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { id } = useParams<{
    id: string
  }>()

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      startAt: event?.start,
      endAt: event?.end,
    })
  }, [event])

  const onSelectSlot = (info: SlotInfo) => {
    const { start, end } = info

    // check invalid time
    if (start < new Date()) return toast.error("Thời gian bắt đầu không được nhỏ hơn hiện tại")

    // check exist matches
    const existingMatches = events.filter((e) => {
      const _start = (e.start || new Date()).getTime()
      const _end = (e.end || new Date()).getTime()
      const slotStart = start.getTime()
      const slotEnd = end.getTime()
      return (
        (_start >= slotStart && _start < slotEnd) ||
        (_end > slotStart && _end <= slotEnd) ||
        (_start <= slotStart && _end >= slotEnd)
      )
    })

    if (existingMatches.length > 0) return toast.error("Thời gian này đã có trận đấu")

    setEvent({
      start: info.start,
      end: info.end,
      title: "Trận đấu",
      resource: {} as IMatch,
    })
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }

  const onSubmit = async (data: FormSchema) => {
    toast.loading("Đang tạo trận đấu", { duration: Infinity })
    const { success, message } = await createMatch({
      ...data,
      tournament: tournamentId,
    })
    toast.dismiss()
    if (!success) {
      return toast.error(message)
    }
    toast.success(message)
    form.reset()
    setEvent(null)
  }

  const onCancel = () => {
    setEvent(null)
  }

  const onSelectEvent = (event: Event) => {
    router.push(
      ROUTE.BRANCH.TOURNAMENT.MATCH.replace(":id", tournamentId)
        .replace(":matchId", event.resource._id)
        .replace(":branchId", id)
    )
  }

  return (
    <div className="rounded-md border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Những trận đấu của giải đấu</h4>
      </div>
      <Separator className="my-2" />
      <BigCalendar
        onSelectSlot={onSelectSlot}
        events={event ? [event, ...events] : events}
        views={["week", "agenda"]}
        defaultView="week"
        onSelectEvent={onSelectEvent}
      />
      {event && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 flex flex-col space-y-4"
            ref={formRef}
          >
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Giờ bắt đầu</FormLabel>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground", "!m-0")}
                        type="button"
                        disabled
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? formatVietnameseDate(field.value, "dd/MM/yyyy HH:mm")
                          : "Chọn giờ"}
                      </Button>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Giờ kết thúc</FormLabel>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground", "!m-0")}
                        type="button"
                        disabled
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? formatVietnameseDate(field.value, "dd/MM/yyyy HH:mm")
                          : "Chọn giờ"}
                      </Button>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Sân bóng</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Chọn sân cho giải đấu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {fields &&
                            (fields.length > 0 ? (
                              fields?.map((field) => (
                                <SelectItem value={field?._id || ""} key={field?._id}>
                                  {field.name}
                                </SelectItem>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground">Không có gì</p>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leftTeam"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Đội 1</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Chọn đội thi đấu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams &&
                            (teams.length > 0 ? (
                              teams?.map((field) => (
                                <SelectItem value={field?._id || ""} key={field?._id}>
                                  {field.name}
                                </SelectItem>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground">Không có gì</p>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rightTeam"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Đội 2</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-max">
                            <SelectValue placeholder="Chọn đội thi đấu" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams &&
                            (teams.length > 0 ? (
                              teams
                                .filter((t) => t._id !== form.getValues("leftTeam"))
                                .map((field) => (
                                  <SelectItem value={field?._id || ""} key={field?._id}>
                                    {field.name}
                                  </SelectItem>
                                ))
                            ) : (
                              <p className="text-xs text-muted-foreground">Không có gì</p>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
            <div className="space-x-2 self-end">
              <Button variant="ghost" onClick={onCancel} type="button">
                Hủy
              </Button>
              <Button>Tạo trận đấu</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default TournamentMatches
