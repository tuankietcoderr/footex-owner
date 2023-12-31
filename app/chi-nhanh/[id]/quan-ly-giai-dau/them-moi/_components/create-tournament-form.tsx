"use client"
import { createTournament } from "@/actions/tournament-actions"
import BigCalendar from "@/components/big-calendar"
import LoadingOverlay from "@/components/loading-overlay"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ROUTE from "@/constants/route"
import IPrize from "@/interface/IPrize"
import ITournament, { ETournamentStatus } from "@/interface/ITournament"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { colorizeTournamentStatus } from "@/utils/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { Event, SlotInfo } from "react-big-calendar"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const CreatePrizeModal = dynamic(() => import("./create-prize-modal"), {
  ssr: false,
  loading: () => <LoadingOverlay />,
})

const formSchema = z
  .object({
    name: z
      .string()
      .max(255, {
        message: "Tên giải đấu không được quá 255 ký tự",
      })
      .min(6, {
        message: "Tên giải đấu không được ít hơn 6 ký tự",
      }),
    description: z.string().max(5000, {
      message: "Mô tả không được quá 5000 ký tự",
    }),
    startAt: z.date().refine((v) => v > new Date(), {
      message: "Thời gian bắt đầu không được nhỏ hơn hiện tại",
    }),
    endAt: z.date().refine((v) => v > new Date(), {
      message: "Thời gian kết thúc không được nhỏ hơn hiện tại",
    }),
    prize: z.string(),
    image: z.string().url("Đường dẫn ảnh không hợp lệ"),
  })
  .refine((v) => v.startAt < v.endAt, {
    message: "Thời gian bắt đầu không được lớn hơn thời gian kết thúc",
    path: ["endAt"],
  })

type CreateTournamentFormProps = {
  tournaments: ITournament[]
  prizes: IPrize[]
}

const CreateTournamentForm = ({ tournaments = [], prizes = [] }: CreateTournamentFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      prize: "",
      image: "",
    },
  })

  const { id } = useParams<{
    id: string
  }>()
  const router = useRouter()

  const [event, setEvent] = React.useState<Event | null>(null)
  const formRef = React.useRef<HTMLFormElement>(null)
  const [prizeVisible, setPrizeVisible] = React.useState(false)

  useEffect(() => {
    form.reset({
      name: event?.resource?.name || "",
      description: event?.resource?.description || "",
      startAt: event?.start || new Date(),
      endAt: event?.end || new Date(),
    })
  }, [event])

  const events = tournaments.map((tournament) => ({
    resource: tournament,
    start: new Date(tournament.startAt),
    end: new Date(tournament.endAt),
    title: tournament.name,
  })) as Event[]

  const onSelectEvent = (event: Event) => {
    const tournament = event.resource as ITournament
    if (!tournament?._id) return
    router.push(
      ROUTE.BRANCH.TOURNAMENT.ID.replace(":branchId", id).replace(":id", tournament?._id!)
    )
  }

  const onSelectSlot = (slotInfo: SlotInfo) => {
    const { start, end } = slotInfo
    if (start < new Date()) return toast.error("Không thể tạo giải đấu ở quá khứ")
    // check if there is any tournaments in this slot
    const existingTournaments = events.filter((e) => {
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

    if (existingTournaments.length > 0) {
      return toast.error("Khung giờ này đã có giải đấu diễn ra")
    }
    setEvent({
      ...slotInfo,
      resource: {
        name: "",
        description: "",
        startAt: slotInfo.start,
        endAt: slotInfo.end,
        status: ETournamentStatus.UPCOMING,
      } as ITournament,
    })
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
      })
    }, 100)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const sendData: ITournament = {
      ...data,
      branch: id,
      images: [data.image],
    }
    // add tournament
    toast.loading("Đang tạo giải đấu...", {
      duration: Infinity,
    })
    const { success, message } = await createTournament(sendData)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    setEvent(null)
  }

  return (
    <>
      {prizeVisible && (
        <CreatePrizeModal visible={prizeVisible} onClose={() => setPrizeVisible(false)} />
      )}
      <div className="space-y-4">
        <div className="rounded-md border p-4 shadow-sm">
          <BigCalendar
            events={event ? [event, ...events] : events}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            eventPropGetter={(event) => {
              const fieldBookedQueue = event.resource as ITournament
              return {
                style: {
                  backgroundColor: colorizeTournamentStatus(fieldBookedQueue.status!, true),
                },
              }
            }}
            views={["month"]}
          />
        </div>
        {event && (
          <Dialog
            open={!!event}
            onOpenChange={(v) => {
              if (!v) setEvent(null)
            }}
          >
            <DialogContent>
              <DialogHeader>Tạo giải đấu</DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  ref={formRef}
                  className="flex flex-col space-y-4 rounded-md border p-4 shadow-sm"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên giải đấu</FormLabel>
                        <FormControl>
                          <Input placeholder="Giải đấu 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hình ảnh giải đấu</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/footex.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thông tin giải đấu</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập thông tin giải đấu..."
                            className="max-h-[300px] min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="startAt"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Ngày bắt đầu</FormLabel>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(!field.value && "text-muted-foreground")}
                              type="button"
                              disabled
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? formatVietnameseDate(field.value, "dd/MM/yyyy")
                                : "Chọn ngày"}
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
                          <FormLabel>Ngày kết thúc</FormLabel>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(!field.value && "text-muted-foreground", "!m-0")}
                              type="button"
                              disabled
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? formatVietnameseDate(field.value, "dd/MM/yyyy")
                                : "Chọn ngày"}
                            </Button>
                          </FormControl>
                        </div>
                        <FormMessage className="text-right" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prize"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Giải thưởng</FormLabel>
                        <div className="self-end">
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <FormControl>
                                <SelectTrigger className="w-max">
                                  <SelectValue placeholder="Chọn giải thưởng cho giải đấu" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {prizes &&
                                  (prizes.length > 0 ? (
                                    prizes?.map((prize) => (
                                      <SelectItem value={prize?._id || ""} key={prize?._id}>
                                        {prize.name}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    //! TODO: add prize
                                    <div>
                                      <p className="text-center text-sm text-muted-foreground">
                                        Không có gì
                                      </p>
                                    </div>
                                  ))}
                                <Button
                                  className="w-full"
                                  variant={"link"}
                                  onClick={() => setPrizeVisible(true)}
                                >
                                  Tạo giải thưởng
                                </Button>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="self-end">
                    Thêm giải đấu
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  )
}

export default CreateTournamentForm
