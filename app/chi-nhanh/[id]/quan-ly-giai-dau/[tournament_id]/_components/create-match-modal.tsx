"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import IField from "@/interface/IField"
import ITeam from "@/interface/ITeam"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

type Props = {
  tournamentId: string
  fields: IField[]
  teams: ITeam[]
  visible: boolean
}

const CreateMatchModal = ({ tournamentId, fields, teams, visible }: Props) => {
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

  const onSubmit = (data: FormSchema) => {}

  return (
    <Dialog open={visible}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo trận đấu</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        {field.value ? formatVietnameseDate(field.value, "hh:mm") : "Chọn giờ"}
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
                        {field.value ? formatVietnameseDate(field.value, "hh:mm") : "Chọn giờ"}
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
                            <p className="text-xs text-muted">Không có gì</p>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateMatchModal
