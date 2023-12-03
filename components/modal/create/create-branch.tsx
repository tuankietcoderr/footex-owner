import useBranchStore from "@/store/useBranchStore"
import useOwnerStore from "@/store/useOwnerStore"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Address from "../../address"
import { Button } from "../../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Textarea } from "../../ui/textarea"
import { useToast } from "../../ui/use-toast"

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
  visible: boolean
  onClose: () => void
}

const CreateBranch = ({ onClose, visible }: Props) => {
  const { owner } = useOwnerStore()
  const { branch, addBranch } = useBranchStore()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      phoneNumber: owner?.phoneNumber || "",
      openAt: new Date().getHours(),
      closeAt: (new Date().getHours() + 7) % 23,
      city: "",
      district: "",
      ward: "",
      street: "",
      houseNumber: "",
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
    await addBranch(data)
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
              </TabsContent>
              <TabsContent value="detail-info" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
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

export default CreateBranch
