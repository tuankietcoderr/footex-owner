import IField from "@/interface/IField"
import useBranchStore from "@/store/useBranchStore"
import useFieldStore from "@/store/useFieldStore"
import useOwnerStore from "@/store/useOwnerStore"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z
    .string()
    .max(255, {
      message: "Tên sân bóng không được quá 255 ký tự",
    })
    .min(6, {
      message: "Tên sân bóng không được ít hơn 6 ký tự",
    }),
  price: z.number().min(1, {
    message: "Giá tiền không được ít hơn 1",
  }),
  description: z
    .string()
    .max(5000, {
      message: "Mô tả không được quá 5000 ký tự",
    })
    .min(6, {
      message: "Mô tả không được ít hơn 6 ký tự",
    }),
  type: z.number({ required_error: "Loại sân không được để trống" }),
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
      type: 5,
    },
  })

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const { owner } = useOwnerStore()
  const { addField } = useFieldStore()
  const { branch } = useBranchStore()
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    const sendData: IField = {
      ...data,
      branch: branch?._id,
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
    <Dialog open={!!owner && visible} onOpenChange={onOpenChange}>
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
                  <FormLabel>Giá sân (Hệ số 1000, ví dụ: nhập 100 -&gt; 100000)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={String(130)}
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại sân</FormLabel>
                  <Select onValueChange={(v) => field.onChange(parseInt(v))}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại sân" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={String(5)}>Sân 5</SelectItem>
                      <SelectItem value={String(7)}>Sân 7</SelectItem>
                      <SelectItem value={String(11)}>Sân 11</SelectItem>
                    </SelectContent>
                  </Select>
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
