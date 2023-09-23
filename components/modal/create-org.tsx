"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import useUserStore from "@/store/useUserStore"
import useBigFieldStore from "@/store/useBigFieldStore"
import { useToast } from "../ui/use-toast"

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
    address: z
      .string()
      .max(200, {
        message: "Địa chỉ không được quá 200 ký tự",
      })
      .min(6, {
        message: "Địa chỉ không được ít hơn 6 ký tự",
      }),
    phone_number: z
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
    email: z.string().email({
      message: "Email không hợp lệ",
    }),
    active_at: z
      .number()
      .int()
      .min(1, {
        message: "Thời gian mở cửa không được nhỏ hơn 1",
      })
      .max(23, {
        message: "Thời gian mở cửa không được lớn hơn 23",
      }),
    inactive_at: z
      .number()
      .int()
      .min(1, {
        message: "Thời gian đóng cửa không được nhỏ hơn 1",
      })
      .max(23, {
        message: "Thời gian đóng cửa không được lớn hơn 23",
      }),
  })
  .refine((data) => data.active_at <= data.inactive_at, {
    message: "Thời gian đóng cửa không được nhỏ hơn thời gian mở cửa",
    path: ["inactive_at"],
  })

type Props = {
  visible: boolean
  onClose: () => void
}

const CreateOrg = ({ onClose, visible }: Props) => {
  const { user } = useUserStore()
  const { bigField, addBigField } = useBigFieldStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
      active_at: 7,
      inactive_at: new Date().getHours(),
    },
  })

  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  type TabKey = "basic-info" | "detail-info"
  const [tab, setTab] = React.useState<TabKey>("basic-info")
  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()

  const onTabChange = (_tab: TabKey) => {
    setTab(_tab)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true)
    await addBigField(data)
      .then((res) => {
        toast({
          title: "Tạo cơ sở thành công",
          description: `Cơ sở ${res.name} đã được tạo thành công`,
        })
        form.reset()
        setTab("basic-info")
        onClose()
      })
      .catch((err) => {
        console.log({ err })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Dialog open={visible} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo cơ sở mới</DialogTitle>
          <DialogDescription>
            Di chuyển giữa các tab để nhập thông tin cơ bản và chi tiết. Khi nhấn Tiếp tục, có thể
            thông tin của tab nào đó sẽ không được xác thực đúng.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs defaultValue={tab} value={tab}>
              <TabsList>
                <TabsTrigger
                  value="basic-info"
                  onClick={() => onTabChange("basic-info")}
                  disabled={loading}
                >
                  Thông tin cơ bản
                </TabsTrigger>
                <TabsTrigger
                  value="detail-info"
                  onClick={() => onTabChange("detail-info")}
                  disabled={loading}
                >
                  Thông tin chi tiết
                </TabsTrigger>
              </TabsList>
              <TabsContent value="basic-info" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên cơ sở</FormLabel>
                      <FormControl>
                        <Input placeholder="Footex" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder={"Nhập địa chỉ..."} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email cơ sở</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập email cơ sở..." {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              <TabsContent value="detail-info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="active_at"
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
                    name="inactive_at"
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
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thông tin cơ sở</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập thông tin cơ sở..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            {tab === "basic-info" ? null : (
              <Button type="submit" className="float-right">
                {!loading ? "Tạo" : "Đang tạo..."}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateOrg
