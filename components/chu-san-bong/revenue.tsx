"use client"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ComboBox, IComboBox } from "../ui/combo-box"
import { getDaysInMonth, monthByNumber, nearlyYears } from "@/lib/date"
import { useState } from "react"

const Revenue = () => {
  const data = [
    {
      month: "Jan",
      revenue_2021: 4200,
    },
    {
      month: "Feb",
      revenue_2021: 3000,
    },
    {
      month: "Mar",
      revenue_2021: 2000,
    },
    {
      month: "Apr",
      revenue_2021: 2780,
    },
    {
      month: "May",
      revenue_2021: 1890,
    },
    {
      month: "Jun",
      revenue_2021: 2390,
    },
    {
      month: "Jul",
      revenue_2021: 3490,
    },
    {
      month: "Aug",
      revenue_2021: 3490,
    },
    {
      month: "Sep",
      revenue_2021: 3490,
    },
    {
      month: "Oct",
      revenue_2021: 3490,
    },
    {
      month: "Nov",
      revenue_2021: 3490,
    },
    {
      month: "Dec",
      revenue_2021: 3490,
    },
  ]
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [day, setDay] = useState(new Date().getDate().toString())
  const [month, setMonth] = useState(new Date().getMonth().toString())
  const [filter, setFilter] = useState("all" as "year" | "month" | "day" | "all")

  const yearsLabel = nearlyYears().map((year) => ({
    label: year.toString(),
    value: year.toString(),
  })) as IComboBox[]

  const monthsLabel = Array.from({ length: 12 }, (_, i) => (i + 1).toString()).map((month) => ({
    label: month,
    value: month,
  })) as IComboBox[]

  const daysInMonth = getDaysInMonth(Number(year), Number(month))
  const daysLabel = Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => ({
    label: day.toString(),
    value: day.toString(),
  })) as IComboBox[]

  const onChangeYear = (value: string) => {
    setYear(value)
  }

  const onChangeMonth = (value: string) => {
    setMonth(value)
  }

  const onChangeDay = (value: string) => {
    setDay(value)
  }

  const filterData: IComboBox[] = [
    {
      label: "Tất cả",
      value: "all",
    },
    {
      label: "Năm",
      value: "year",
    },
    {
      label: "Tháng",
      value: "month",
    },
    {
      label: "Ngày",
      value: "day",
    },
  ]

  const onChangeFilter = (value: string) => {
    setFilter(value as "year" | "month" | "day")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-end gap-2">
          <ComboBox
            initialText="Theo"
            data={filterData}
            onChange={onChangeFilter}
            className="w-fit"
            value={filter}
          />
          {(filter === "year" || filter === "all") && (
            <ComboBox
              initialText="Chọn năm"
              data={yearsLabel}
              onChange={onChangeYear}
              className="w-fit"
              value={new Date().getFullYear().toString()}
              extraText="Năm"
            />
          )}
          {(filter === "month" || filter === "all") && (
            <ComboBox
              initialText="Chọn tháng"
              data={monthsLabel}
              onChange={onChangeMonth}
              className="w-fit"
              value={month}
              extraText="Tháng"
            />
          )}
          {(filter === "day" || filter === "all") && (
            <ComboBox
              initialText="Chọn ngày"
              data={daysLabel}
              onChange={onChangeDay}
              className="w-fit"
              value={day}
              extraText="Ngày"
            />
          )}
        </div>
        <ResponsiveContainer width={"100%"} height={300}>
          <BarChart width={200} height={300} data={data}>
            <CartesianGrid strokeDasharray="1 0" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue_2021" stackId="a" fill="#8884d8" radius={100} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default Revenue
