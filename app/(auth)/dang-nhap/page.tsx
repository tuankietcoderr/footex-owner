"use client"
import { loginOwner } from "@/actions/auth-actions"
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
import ROUTE from "@/constants/route"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  emailOrPhoneNumber: z.string(),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang đăng nhập...", {
      duration: Infinity,
    })
    const { success, message } = await loginOwner(data)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-fit w-[400px] flex-col gap-4 rounded-lg p-6 shadow-lg"
      >
        <h1 className="text-center text-2xl font-semibold">Đăng nhập chủ sân</h1>

        <FormField
          control={form.control}
          name="emailOrPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email/số điện thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="123456789aA@" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-end">
          <Link href={ROUTE.AUTH.FORGOT_PASSWORD} className="text-sm underline">
            Quên mật khẩu?
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Đăng nhập
        </Button>
        <Button variant="outline" type="button" className="w-full" asChild>
          <Link href={ROUTE.AUTH.SIGN_UP}>Đăng ký</Link>
        </Button>
      </form>
    </Form>
  )
}

export default Page
