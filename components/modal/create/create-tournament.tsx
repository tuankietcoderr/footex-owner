import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ITournament from "@/interface/ITournament"
import { cn } from "@/lib/utils"
import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import usePrizeStore from "@/store/usePrizeStore"
import useTournamentStore from "@/store/useTournamentStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import moment from "moment"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Textarea } from "../../ui/textarea"
import { useToast } from "../../ui/use-toast"
import { useTournamentManagementContext } from "@/context/TournamentManagementContext"

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
  })
  .refine((v) => v.startAt < v.endAt, {
    message: "Thời gian bắt đầu không được lớn hơn thời gian kết thúc",
    path: ["endAt"],
  })

type CreateTournamentModalProps = {
  onClose: () => void
  visible: boolean
}

const CreateTournamentModal = ({ onClose, visible = false }: CreateTournamentModalProps) => {
  const { initialData } = useTournamentManagementContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      prize: "",
    },
  })

  useEffect(() => {
    form.reset({
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
  const { addTournament } = useTournamentStore()
  const { branch } = useBranchStore()
  const { prizes } = usePrizeStore()
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log({ data })
    setLoading(true)
    const sendData: ITournament = {
      ...data,
      branch: branch?._id,
    }
    await addTournament(sendData)
      .then((res) => {
        onClose()
        form.reset()
        toast({
          title: "Tạo giải đấu thành công",
          description: `Giải đấu ${res.name} đã được tạo thành công`,
        })
      })
      .catch((err) => {
        toast({
          title: "Tạo giải đấu thất bại",
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
          <DialogTitle>Tạo giải đấu</DialogTitle>
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
            <FormField
              control={form.control}
              name="prize"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Giải thưởng</FormLabel>
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
                            <p className="text-xs text-muted">Không có gì</p>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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

export default CreateTournamentModal
