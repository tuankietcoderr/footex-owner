"use client"
import { createField } from "@/actions/field-actions"
import { Button } from "@/components/ui/button"
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
import IField from "@/interface/IField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

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

type Props = {
  branchId: string
}

const CreateFieldForm = ({ branchId }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 180000,
      description: "",
      type: 5,
    },
  })

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const sendData: IField = {
      ...data,
      branch: branchId,
    }
    toast.loading("Đang thêm sân bóng", {
      duration: Infinity,
    })
    const { success, message } = await createField(sendData)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    router.push(ROUTE.BRANCH.FIELD.INDEX.replace(":branchId", branchId))
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-md border p-4 shadow-sm"
      >
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
        <Button type="submit">Thêm sân</Button>
      </form>
    </Form>
  )
}

export default CreateFieldForm
