"use client"
import { forgotPassword, loginOwner, sendVerifyEmail } from "@/actions/auth-actions"
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
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
})

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const router = useRouter()

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang gửi mật khẩu...", {
      duration: Infinity,
    })
    const { success, message } = await forgotPassword(data.email)
    toast.dismiss()
    if (success) {
      toast.success(message)
      router.back()
    } else {
      toast.error(message)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-fit w-[400px] space-y-4 rounded-lg p-6 shadow-lg"
      >
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu</h1>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email của bạn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link href={ROUTE.AUTH.FORGOT_PASSWORD}></Link>
        <Button type="submit" className="w-full">
          Gửi
        </Button>
        <Button variant="outline" type="button" className="w-full" asChild>
          <Link href={ROUTE.AUTH.SIGN_UP}>Đăng ký tài khoản mới</Link>
        </Button>
      </form>
    </Form>
  )
}

export default Page
