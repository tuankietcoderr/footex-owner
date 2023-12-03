import useBranchStore from "@/store/useBranchStore"
import useFieldStore from "@/store/useFieldStore"
import useOwnerStore from "@/store/useOwnerStore"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
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

const formSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: "Tên giải thưởng không được quá 255 ký tự",
    })
    .min(6, {
      message: "Tên giải thưởng không được ít hơn 6 ký tự",
    }),
  description: z.string().max(5000, {
    message: "Mô tả không được quá 5000 ký tự",
  }),
  image: z.string().url({
    message: "Link ảnh không hợp lệ",
  }),
  value: z.number().min(10000, {
    message: "Giá trị giải thưởng không được nhỏ hơn 10.000 VND",
  }),
})

type CreatePrizeModalProps = {
  onClose: () => void
  visible: boolean
}

const CreatePrizeModal = ({ onClose, visible = false }: CreatePrizeModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      value: 10000,
    },
  })
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const { owner } = useOwnerStore()
  const { addPrize } = usePrizeStore()
  const { branch } = useBranchStore()
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log({ data })
    setLoading(true)
    const sendData: IPrize = {
      ...data,
      branch: branch?._id,
    }
    await addPrize(sendData)
      .then((res) => {
        onClose()
        form.reset()
        toast({
          title: "Tạo giải thưởng thành công",
          description: `Giải thưởng ${res.name} đã được tạo thành công`,
        })
      })
      .catch((err) => {
        toast({
          title: "Tạo giải thưởng thất bại",
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
          <DialogTitle>Tạo giải thưởng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên giải thưởng</FormLabel>
                  <FormControl>
                    <Input placeholder="Giải thưởng 1" {...field} />
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
                  <FormLabel>Thông tin giải thưởng</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập thông tin giải thưởng..."
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trị giá giải thưởng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10000"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value))
                      }}
                    />
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
                  <FormLabel>Hình ảnh giải thưởng</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập URL hình ảnh giải thưởng" {...field} />
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

export default CreatePrizeModal
