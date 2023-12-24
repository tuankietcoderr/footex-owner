"use client"
import UpdateFieldModal from "@/components/modal/update-field-info-modal"
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
import IField, { EFieldStatus } from "@/interface/IField"
import { toDot } from "@/lib/converter"
import { vilizeFieldStatus } from "@/utils/status"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useCallback, useEffect, useState } from "react"

type Props = {
  fields: IField[]
  branchId: string
}

const AllFields = ({ fields, branchId }: Props) => {
  const [_fields, setFields] = useState<IField[]>(fields)

  useEffect(() => {
    setFields(fields)
  }, [fields])

  const tableHeaders = ["Tên sân", "Loại sân", "Giá thuê", "Trạng thái", "Hành động"]

  const tableColumns: ColumnProps<IField>[] = [
    {
      headRef: "Tên sân",
      render: (row: IField) => row.name,
    },
    {
      headRef: "Loại sân",
      render: (row: IField) => "Sân " + row.type,
    },
    {
      headRef: "Giá thuê",
      render: (row: IField) => toDot(row.price) + " VND",
    },
    {
      headRef: "Trạng thái",
      render: (row: IField) => vilizeFieldStatus(row.status!),
    },
    {
      headRef: "Hành động",
      render: (row: IField) => (
        <div>
          <Button variant={"ghost"} className="text-primary" asChild>
            <Link
              href={ROUTE.BRANCH.FIELD.ID.replace(":branchId", branchId).replace(":id", row?._id!)}
            >
              Xem
            </Link>
          </Button>
          <UpdateFieldModal
            fieldId={row?._id!}
            initialData={row}
            trigger={
              <Button variant={"ghost"} className="text-secondary-foreground">
                Sửa
              </Button>
            }
          />

          {/* <Button variant={"ghost"} className="text-destructive">
            Xóa
          </Button> */}
        </div>
      ),
    },
  ]

  const { id } = useParams<{
    id: string
  }>()

  const onSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields(
        fields.filter((field) => field.name.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    },
    [fields]
  )

  const onChangeStatus = useCallback(
    (status: EFieldStatus) => {
      setFields(fields.filter((field) => field.status === status))
    },
    [fields]
  )

  const onReset = () => setFields(fields)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm giải đấu..." onChange={onSearch} />
        <Select onValueChange={onChangeStatus}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {Object.values(EFieldStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {vilizeFieldStatus(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
        <Button asChild>
          <Link href={ROUTE.BRANCH.FIELD.CREATE.replace(":branchId", id)}>Tạo sân bóng mới</Link>
        </Button>
      </div>
      <Table
        headers={tableHeaders}
        columns={tableColumns}
        data={_fields}
        className="border shadow-sm"
      />
    </div>
  )
}

export default AllFields
