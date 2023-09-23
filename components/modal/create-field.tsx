import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { toDot } from "@/lib/converter"
import useUserStore from "@/store/useUserStore"
import { Textarea } from "../ui/textarea"
import useFieldStore from "@/store/useFieldStore"
import { useToast } from "../ui/use-toast"
import useBigFieldStore from "@/store/useBigFieldStore"
import IField from "@/interface/IField"

const formSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: "Tên sân bóng không được quá 255 ký tự",
    })
    .min(6, {
      message: "Tên sân bóng không được ít hơn 6 ký tự",
    }),
  price: z
    .number()
    .max(1000000000, {
      message: "Giá tiền không được quá 1 tỷ",
    })
    .min(1000, {
      message: "Giá tiền không được ít hơn 1 nghìn",
    }),
  description: z
    .string()
    .max(5000, {
      message: "Mô tả không được quá 5000 ký tự",
    })
    .min(6, {
      message: "Mô tả không được ít hơn 6 ký tự",
    }),
})

type CreateFieldModalProps = {
  onClose: () => void
  visible: boolean
}

const CreateFieldModal = ({ onClose, visible = false }: CreateFieldModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  })

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const { user } = useUserStore()
  const { addField } = useFieldStore()
  const { bigField } = useBigFieldStore()
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const sendData: IField = {
      ...data,
      organization: bigField?._id,
    }
    await addField(sendData)
      .then((res) => {
        onClose()
        form.reset()
        toast({
          title: "Tạo sân bóng thành công",
          description: `Sân bóng ${res.name} đã được tạo thành công`,
        })
      })
      .catch((err) => {
        toast({
          title: "Tạo sân bóng thất bại",
          description: err,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Dialog open={!!user && visible} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo sân bóng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sân bóng</FormLabel>
                  <FormControl>
                    <Input placeholder="Sân bóng 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá sân</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={toDot(130000)}
                      {...field}
                      onChange={(e) => {
                        if (!e.target.value) return field.onChange?.("")
                        field.onChange?.(parseInt(e.target.value.replaceAll(".", ""), 10))
                      }}
                      type="number"
                    />
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
                  <FormLabel>Thông tin sân</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Nhập thông tin sân..."
                      className="min-h-[100px]"
                      {...field}
                    />
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

export default CreateFieldModal
