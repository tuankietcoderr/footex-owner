"use client"
import { updateFieldInfo } from "@/actions/field-actions"
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
import { Textarea } from "@/components/ui/textarea"
import IField from "@/interface/IField"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
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

type FormSchema = z.infer<typeof formSchema>

type UpdateFieldModalProps = {
  initialData?: FormSchema
  fieldId: string
  trigger: React.ReactNode
}

const UpdateFieldModal = ({ initialData, fieldId, trigger }: UpdateFieldModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name,
      price: initialData?.price,
      description: initialData?.description,
      type: initialData?.type,
    },
  })

  const [open, setOpen] = useState(false)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!form.getValues().name) {
      form.reset(initialData)
    }
  }, [initialData])

  const _onSubmit = async (data: z.infer<typeof formSchema>) => {
    const sendData: IField = {
      ...data,
      branch: id,
    }
    toast.loading("Đang cập nhật thông tin sân", {
      duration: Infinity,
    })
    const { success, message } = await updateFieldInfo(fieldId, sendData)
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
          <DialogTitle>Cập nhật sân bóng</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(_onSubmit)} className="space-y-4">
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
                  <Select
                    onValueChange={(v) => field.onChange(parseInt(v))}
                    defaultValue={form.getValues().type.toString()}
                  >
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
            <Button type="submit" className="float-right">
              Cập nhật
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateFieldModal
