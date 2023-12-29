"use client"
import { deleteInvoice, updateInvoiceStatus } from "@/actions/invoice-actions"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ROUTE from "@/constants/route"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"
import IGuest from "@/interface/IGuest"
import IInvoice, { EInvoiceStatus } from "@/interface/IInvoice"
import { toDot } from "@/lib/converter"
import { formatVietnameseDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import { vilizeInvoiceStatus } from "@/utils/status"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect } from "react"
import toast from "react-hot-toast"
import Invoice from "./invoice"

type Props = {
  invoices: IInvoice[]
}

const AllInvoices = ({ invoices }: Props) => {
  const [_invoices, setInvoices] = React.useState<IInvoice[]>(invoices)

  useEffect(() => {
    setInvoices(invoices)
  }, [invoices])

  const tableHeaders = [
    "Ngày lập hóa đơn",
    "Khách hàng",
    "Thời gian sử dụng",
    "Tổng tiền",
    "Trạng thái",
    "Hành động",
  ]

  const tableColumns: ColumnProps<IInvoice>[] = [
    {
      headRef: "Khách hàng",
      render: (row: IInvoice) => ((row.fieldBooked as IFieldBookedQueue)?.bookedBy as IGuest)?.name,
    },
    {
      headRef: "Thời gian sử dụng",
      render: (row: IInvoice) => {
        const fieldBooked = row.fieldBooked as IFieldBookedQueue
        const startAt = new Date(fieldBooked.startAt).getHours()
        const endAt = new Date(fieldBooked.endAt).getHours()
        return `${startAt}h - ${endAt}h (${endAt - startAt}h)`
      },
    },
    {
      headRef: "Ngày lập hóa đơn",
      render: (row: IInvoice) => formatVietnameseDate(row.createdAt!, "hh:mm dd/MM/yyyy"),
    },
    {
      headRef: "Tổng tiền",
      render: (row: IInvoice) => `${toDot(row.total)} VND`,
    },
    {
      headRef: "Trạng thái",
      render: (row: IInvoice) =>
        row.status === EInvoiceStatus.PENDING ? (
          <div className="flex justify-center">
            <Select
              onValueChange={(v) => onUpdateInvoiceStatus(row._id!, v as EInvoiceStatus)}
              defaultValue={row.status}
              value={row.status}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                {Object.values(EInvoiceStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {vilizeInvoiceStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <p
            className={cn(
              row.status === EInvoiceStatus.PAID ? "text-primary" : "text-secondary-foreground"
            )}
          >
            {vilizeInvoiceStatus(row.status!)}
          </p>
        ),
    },
    {
      headRef: "Hành động",
      render: (row: IInvoice) => (
        <div className="flex">
          {row.status === EInvoiceStatus.PAID && <Invoice invoice={row} />}
          <Button
            variant={"ghost"}
            className="text-destructive"
            onClick={() => onDeleteInvoice(row._id!)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  async function onUpdateInvoiceStatus(id: string, status: EInvoiceStatus) {
    toast.loading("Đang cập nhật trạng thái...", {
      duration: Infinity,
    })
    const { success, message } = await updateInvoiceStatus(id, status)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  async function onDeleteInvoice(id: string) {
    toast.loading("Đang xóa hóa đơn...", {
      duration: Infinity,
    })
    const { success, message } = await deleteInvoice(id)
    toast.dismiss()
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  async function onPrintInvoice(id: string) {}

  const { id } = useParams<{
    id: string
  }>()

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInvoices(
        invoices.filter((invoice) =>
          ((invoice.fieldBooked as IFieldBookedQueue).bookedBy as IGuest).name
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      )
    },
    [invoices]
  )

  const onChangeStatus = useCallback(
    (status: EInvoiceStatus) => {
      setInvoices(invoices.filter((tournament) => tournament.status === status))
    },
    [invoices]
  )

  const onReset = () => setInvoices(invoices)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm hóa đơn..." onChange={onSearch} />
        <Select onValueChange={onChangeStatus}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {Object.values(EInvoiceStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {vilizeInvoiceStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
      </div>
      <Table
        headers={tableHeaders}
        columns={tableColumns}
        data={_invoices}
        className="border shadow-sm"
      />
    </div>
  )
}

export default AllInvoices
