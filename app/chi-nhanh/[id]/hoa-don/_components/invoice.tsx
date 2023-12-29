import AppAvatar from "@/components/app-avatar"
import Logo from "@/components/logo"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import IField from "@/interface/IField"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import IInvoice from "@/interface/IInvoice"
import { toAddress, toDot } from "@/lib/converter"
import { formatVietnameseDate } from "@/lib/date"
import React from "react"
import ReactToPrint from "react-to-print"

type Props = {
  invoice: IInvoice
}

const Invoice = ({ invoice }: Props) => {
  const ref = React.useRef(null)
  const { total, fieldBooked, _id, createdAt } = invoice
  const _fieldBooked = fieldBooked as IFieldBookedQueue
  const startAt = new Date(_fieldBooked.startAt).getHours()
  const endAt = new Date(_fieldBooked.endAt).getHours()
  const time = `${startAt}h - ${endAt}h (${endAt - startAt}h)`
  const date = formatVietnameseDate(createdAt!, "HH:mm dd/MM/yyyy")
  const { name, phoneNumber, email, avatar, ...rest } = _fieldBooked.bookedBy as IGuest
  const address = toAddress(rest)
  const field = _fieldBooked.field as IField
  const { name: fieldName, price, image } = field
  const totalMoneyText = toDot(total) + " VND"

  const headers: string[] = [
    "Thời gian bắt đầu",
    "Thời gian kết thúc",
    "Thời gian sử dụng",
    "Giá sân/giờ",
  ]
  const data = [
    {
      startAt: formatVietnameseDate(_fieldBooked.startAt, "HH:mm dd/MM/yyyy"),
      endAt: formatVietnameseDate(_fieldBooked.startAt, "HH:mm dd/MM/yyyy"),
      time,
      price: toDot(price) + " VND",
      totalMoneyText,
    },
  ]

  const columns: ColumnProps<(typeof data)[0]>[] = [
    {
      headRef: "Thời gian bắt đầu",
      render: (data) => <p>{data.startAt}</p>,
    },
    {
      headRef: "Thời gian kết thúc",
      render: (data) => <p>{data.endAt}</p>,
    },
    {
      headRef: "Thời gian sử dụng",
      render: (data) => <p>{data.time}</p>,
    },
    {
      headRef: "Giá sân/giờ",
      render: (data) => <p>{data.price}</p>,
    },
  ]
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>In</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[40rem]">
          <div className="flex flex-col justify-between gap-4 p-4" ref={ref}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Hóa đơn thanh toán</h2>
                <p className="mt-4">Ngày lập hóa đơn</p>
                <p className="text-lg font-semibold">{date}</p>
              </div>
              <div className="flex flex-col text-right">
                <Logo
                  color="var(--primary)"
                  className="h-8 w-fit translate-x-2 self-end fill-primary"
                />
                <p className="mt-4">Mã hóa đơn</p>
                <p className="text-lg font-semibold">{_id}</p>
              </div>
            </div>
            <div>
              <div className="space-y-1">
                <p>Khách thanh toán</p>
                <AppAvatar src={avatar!} alt={name} />
                <p className="text-lg font-bold">{name}</p>
                <p className="text-xs">{phoneNumber}</p>
                <p className="text-xs">{email}</p>
                <p className="text-xs">{address}</p>
              </div>
              <div className="mt-4 space-y-1">
                <p>Thanh toán cho</p>
                <AppAvatar src={image!} alt={fieldName} className="self-end" />
                <p className="text-lg font-bold">{fieldName}</p>
              </div>
            </div>
            <div>
              <Table headers={headers} data={data} columns={columns} />
            </div>
            <div className="flex justify-end">
              <div className="flex flex-col text-right">
                <p className="text-lg font-semibold">Tổng tiền</p>
                <p className="text-lg font-semibold">{totalMoneyText}</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <ReactToPrint
              content={() => ref.current}
              trigger={() => <Button variant={"ghost"}>In</Button>}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Invoice
