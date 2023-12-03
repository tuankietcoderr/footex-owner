import useBranchStore from "@/store/useBranchStore"
import useFieldStore from "@/store/useFieldStore"
import useOwnerStore from "@/store/useOwnerStore"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ZodAny, ZodRawShape, z } from "zod"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { useToast } from "../../ui/use-toast"
import IPrize from "@/interface/IPrize"
import usePrizeStore from "@/store/usePrizeStore"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import { useRouter } from "next/navigation"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import moment from "moment"
import { Calendar } from "@/components/ui/calendar"
import { searchGuest } from "@/services/guest"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IGuest from "@/interface/IGuest"
import useFieldBookedQueueStore from "@/store/useFieldBookedQueueStore"
import { format } from "date-fns"
import { useFieldBookedQueueManagementContext } from "@/context/FieldBookedQueueManagementContext"
import viVN from "date-fns/locale/vi"

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

type AddBookedGuestToFieldModalProps = {
  onClose: () => void
  visible: boolean
  field: string
}

const AddBookedGuestToFieldModal = ({
  onClose,
  visible = false,
  field,
}: AddBookedGuestToFieldModalProps) => {
  const { initialData } = useFieldBookedQueueManagementContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookedBy: "",
      startAt: new Date(),
      endAt: new Date(),
    },
  })

  useEffect(() => {
    form.reset({
      bookedBy: (initialData?.bookedBy as string) || "",
      startAt: initialData?.startAt || new Date(),
      endAt: initialData?.endAt || new Date(),
    })
  }, [initialData])

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const { owner } = useOwnerStore()
  const { addFieldBookedQueue } = useFieldBookedQueueStore()
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [guest, setGuest] = React.useState<IGuest | null>(null)

  const onSearchGuest = async () => {
    if (!phoneNumber) {
      return
    }
    await searchGuest(phoneNumber)
      .then((res) => {
        if (res.success) {
          setGuest(res.data)
        } else {
          toast({
            description: res?.message,
          })
        }
      })
      .catch((err) => {
        toast({
          title: "Tìm kiếm thất bại",
          description: err,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const sendData: IFieldBookedQueue = {
      ...data,
      field,
    }
    await addFieldBookedQueue(sendData)
      .then(() => {
        onClose()
        form.reset()
        toast({
          description: "Đặt lịch thành công",
        })
      })
      .catch((err) => {
        toast({
          title: "Đặt lịch thất bại",
          description: err,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Dialog open={!!owner && visible} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Đặt lịch</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="startAt"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Thời gian đặt</FormLabel>
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(!field.value && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy hh:mm", { locale: viVN })
                            : "Chọn thời gian đặt"}
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
                  <Popover>
                    <FormControl>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(!field.value && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy hh:mm", { locale: viVN })
                            : "Chọn thời gian kết thúc"}
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
                      placeholder="Nhập số điện thoại người đặt"
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                  {guest && (
                    <div className="flex items-center justify-between gap-2 rounded-md border border-input p-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>{guest?.name?.substring(0, 2)}</AvatarFallback>
                          <AvatarImage src={guest?.avatar} alt={guest?.name} />
                        </Avatar>
                        <div>
                          <div className="font-semibold">{guest?.name}</div>
                          <div className="text-xs text-muted-foreground">{guest?.phoneNumber}</div>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="float-right" disabled={loading}>
              {!loading ? "Tạo" : "Đang tạo..."}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBookedGuestToFieldModal
