"use client"
import { registerOwner } from "@/actions/auth-actions"
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
import ROUTE from "@/constants/route"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    phoneNumber: z
      .string()
      .refine(
        (data) => new RegExp(/^(0[1-9])+([0-9]{8})\b/).test(data),
        "Số điện thoại không hợp lệ"
      ),
    password: z
      .string()
      .min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      })
      .max(20, {
        message: "Mật khẩu không được quá 20 ký tự",
      })
      .refine(
        (data) =>
          new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/).test(data),
        "Mật khẩu không hợp lệ, phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt"
      ),
    confirm: z.string(),
    name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
    city: z.string().nonempty({ message: "Tỉnh/thành phố không được để trống" }),
    district: z.string().nonempty({ message: "Quận/huyện không được để trống" }),
    ward: z.string().nonempty({ message: "Phường/xã không được để trống" }),
    street: z.string(),
    houseNumber: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu không khớp",
    path: ["confirm"],
  })

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      name: "",
      confirm: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    toast.loading("Đang đăng ký...", {
      duration: Infinity,
    })
    const { success, message } = await registerOwner(data)
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
        className="h-fit w-[400px] space-y-4 rounded-lg p-6 shadow-lg"
      >
        <h1 className="text-center text-2xl font-semibold">Đăng ký</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Foot Văn Tex" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="footex@footex.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input placeholder="0123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Address showStreet showHouseNumber />
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
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Xác nhận mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="123456789aA@" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Đăng ký
        </Button>
        <Button variant="outline" type="button" className="w-full" asChild>
          <Link href={ROUTE.AUTH.SIGN_IN}>Đăng nhập</Link>
        </Button>
      </form>
    </Form>
  )
}

export default Page
