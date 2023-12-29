"use client"
import { createBranch, updateBranchInfo } from "@/actions/branch-actions"
import Address from "@/components/address"
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
import { Textarea } from "@/components/ui/textarea"
import ROUTE from "@/constants/route"
import IBranch from "@/interface/IBranch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

const formSchema = z
  .object({
    name: z
      .string()
      .max(255, {
        message: "Tên sân bóng không được quá 255 ký tự",
      })
      .min(6, {
        message: "Tên sân bóng không được ít hơn 6 ký tự",
      }),
    description: z
      .string()
      .max(5000, {
        message: "Mô tả không được quá 5000 ký tự",
      })
      .min(6, {
        message: "Mô tả không được ít hơn 6 ký tự",
      }),
    phoneNumber: z
      .string()
      .max(10, {
        message: "Số điện thoại không được quá 10 ký tự",
      })
      .min(10, {
        message: "Số điện thoại không được ít hơn 10 ký tự",
      })
      .refine(
        (value) => {
          // eslint-disable-next-line no-useless-escape
          return new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).test(value)
        },
        {
          message: "Số điện thoại không hợp lệ",
        }
      ),
    openAt: z
      .number()
      .int()
      .min(1, {
        message: "Thời gian mở cửa không được nhỏ hơn 1",
      })
      .max(23, {
        message: "Thời gian mở cửa không được lớn hơn 23",
      }),
    closeAt: z
      .number()
      .int()
      .min(1, {
        message: "Thời gian đóng cửa không được nhỏ hơn 1",
      })
      .max(23, {
        message: "Thời gian đóng cửa không được lớn hơn 23",
      }),
    city: z.string().nonempty({ message: "Tỉnh/thành phố không được để trống" }),
    district: z.string().nonempty({ message: "Quận/huyện không được để trống" }),
    ward: z.string().nonempty({ message: "Phường/xã không được để trống" }),
    street: z.string(),
    houseNumber: z.string(),
  })
  .refine((data) => data.openAt <= data.closeAt, {
    message: "Thời gian đóng cửa không được nhỏ hơn thời gian mở cửa",
    path: ["closeAt"],
  })

type Props = {
  branch: IBranch
}

const UpdateBranchForm = ({ branch }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...branch,
    },
  })

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang cập nhật thông tin chi nhánh...", {
      duration: Infinity,
    })
    const { success, message } = await updateBranchInfo(branch?._id!, data)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-xl font-semibold">Cập nhật thông tin chi nhánh</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên chi nhánh</FormLabel>
              <FormControl>
                <Input placeholder="Footex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Address />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại liên hệ</FormLabel>
              <FormControl>
                <Input placeholder="Nhập số điện thoại..." {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời gian mở cửa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập thời gian mở cửa..."
                  {...field}
                  type="number"
                  onChange={(e) => {
                    if (!e.target.value) return field.onChange?.("")
                    field.onChange?.(parseInt(e.target.value.replaceAll(".", ""), 10))
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="closeAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thời gian đóng cửa</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập thời gian đóng cửa..."
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
              <FormLabel>Thông tin chi nhánh</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập thông tin chi nhánh..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" type="button" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button type="submit">Cập nhật</Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateBranchForm
