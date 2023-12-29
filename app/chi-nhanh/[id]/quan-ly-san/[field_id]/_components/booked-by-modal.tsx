"use client"
import { searchGuestByEmailOrPhoneNumber } from "@/actions/guest-actionts"
import AppAvatar from "@/components/app-avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { COMMON } from "@/constants/common"
import ROUTE from "@/constants/route"
import IGuest from "@/interface/IGuest"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type FormSchema = z.infer<typeof formSchema>

type Props = {
  visible: boolean
  initialData?: FormSchema
  onSubmit: (data: FormSchema) => void
  onOpenChange: (open: boolean) => void
}

const formSchema = z
  .object({
    bookedBy: z.string(),
    startAt: z.date(),
    endAt: z.date(),
  })
  .refine((data) => data.startAt < data.endAt, {
    message: "Thời gian kết thúc phải sau thời gian bắt đầu",
    path: ["endAt"],
  })

const BookedByModal = ({ visible = false, initialData, onSubmit, onOpenChange }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookedBy: initialData?.bookedBy || "",
      startAt: initialData?.startAt || new Date(),
      endAt: initialData?.endAt || new Date(),
    },
  })

  console.log(new Date().toLocaleTimeString())

  const pathname = usePathname()
  const { id: branchId } = useParams<{ id: string }>()

  const [emailOrPhoneNumber, setEmailOrPhoneNumber] = useState("")
  const [guest, setGuest] = useState<IGuest | null>(null)

  const onSearchGuest = async () => {
    if (!emailOrPhoneNumber) {
      return
    }
    const { success, message, data } = await searchGuestByEmailOrPhoneNumber(emailOrPhoneNumber)
    if (!success) {
      setGuest({} as IGuest)
      return toast.error(message)
    }
    setGuest(data as IGuest)
    setEmailOrPhoneNumber("")
    form.setValue("bookedBy", "")
  }

  const _onSubmit = (data: FormSchema) => {
    if (!data.bookedBy) {
      return toast.error("Vui lòng chọn khách hàng")
    }
    onSubmit(data)
  }

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đặt lịch</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Thời gian đặt</FormLabel>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(!field.value && "text-muted-foreground")}
                      type="button"
                      disabled
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value
                        ? formatVietnameseDate(field.value, "dd/MM/yyyy HH:mm")
                        : "Chọn thời gian đặt"}
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endAt"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Thời gian kết thúc</FormLabel>
                  <FormControl>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                        type="button"
                        disabled
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? formatVietnameseDate(field.value, "dd/MM/yyyy HH:mm")
                          : "Chọn thời gian kết thúc"}
                      </Button>
                    </FormControl>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Người đặt</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Nhập email hoặc SĐT người đặt"
                      onChange={(e) => setEmailOrPhoneNumber(e.target.value)}
                    />
                    <Button
                      className="min-w-max"
                      type="button"
                      variant={"outline"}
                      onClick={onSearchGuest}
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                  {guest && guest._id && (
                    <div className="flex items-center justify-between gap-2 rounded-md border border-input p-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <AppAvatar src={guest?.avatar!} alt={guest.name} />
                        <div>
                          <div className="font-semibold">{guest?.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {guest?.phoneNumber} • {guest?.email}
                          </div>
                        </div>
                      </div>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            if (!field.value) {
                              form.setValue("bookedBy", guest?._id || "")
                              field.onChange(guest?._id || "")
                            } else {
                              form.setValue("bookedBy", "")
                              field.onChange("")
                            }
                          }}
                        >
                          {field.value ? "Đã chọn" : "Chọn"}
                        </Button>
                      </FormControl>
                    </div>
                  )}
                  {guest && !guest._id && (
                    <div>
                      <span className="text-sm text-red-500">Không tìm thấy khách hàng.</span>{" "}
                      <Link
                        href={ROUTE.BRANCH.GUEST.CREATE.replace(":branchId", branchId).concat(
                          `?${COMMON.CREATE_GUEST_FALLBACK}=${encodeURIComponent(pathname)}`
                        )}
                        className="text-sm text-primary underline"
                      >
                        Tạo tài khoản cho khách hàng
                      </Link>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues().bookedBy && (
              <Button type="submit" className="float-right">
                Đặt
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BookedByModal
