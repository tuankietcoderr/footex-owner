"use client"
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
import useUserStore from "@/store/useOwnerStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
  emailOrPhoneNumber: z.string(),
  password: z.string(),
})

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
  })

  const { login } = useUserStore()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  console.log({ loading })
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    login(data)
      .then(() => {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn đến với Footex",
        })
      })
      .catch((err) => {
        toast({
          title: "Đăng nhập thất bại",
          description: err,
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit w-[400px] space-y-4 rounded-lg border border-border bg-card  p-6 shadow-lg"
      >
        <h1 className="text-center text-2xl font-semibold">Đăng nhập</h1>

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
        <Button type="submit" className="w-full" disabled={loading}>
          {!loading ? "Đăng nhập" : "Đang đăng nhập..."}
        </Button>
        <Button className="w-full" asChild variant={"outline"}>
          <Link href="/dang-ky">Đăng ký</Link>
        </Button>
      </form>
    </Form>
  )
}

export default Page
