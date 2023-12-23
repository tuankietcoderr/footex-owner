import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ITournament from "@/interface/ITournament"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import IPrize from "@/interface/IPrize"
import toast from "react-hot-toast"
import { updateTournamentInfo } from "@/actions/tournament-actions"
import { useParams } from "next/navigation"

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
  })
  .refine((v) => v.startAt < v.endAt, {
    message: "Thời gian bắt đầu không được lớn hơn thời gian kết thúc",
    path: ["endAt"],
  })

type FormSchema = z.infer<typeof formSchema>

type UpdateTournamentModalProps = {
  initialData?: FormSchema
  tournamentId: string
  trigger: React.ReactNode
}

const UpdateTournamentModal = ({
  initialData,
  tournamentId,
  trigger,
}: UpdateTournamentModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  useEffect(() => {
    form.reset({
      ...initialData,
      startAt: new Date(initialData?.startAt!) || new Date(),
      endAt: new Date(initialData?.endAt!) || new Date(),
    })
  }, [initialData])

  const [open, setOpen] = useState(false)
  const { id } = useParams<{ id: string }>()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const sendData: ITournament = {
      ...data,
      branch: id,
    }

    toast.loading("Đang cập nhật giải đấu...", {
      duration: Infinity,
    })
    const { success, message } = await updateTournamentInfo(tournamentId, sendData)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật giải đấu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(!field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? moment(field.value).format("DD/MM/YYYY") : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
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
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(!field.value && "text-muted-foreground", "!m-0")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? moment(field.value).format("DD/MM/YYYY") : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          initialFocus
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />

            <Button type="submit" className="float-right">
              Cập nhật giải đấu
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTournamentModal
