"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const Dashboard = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2100, amt: 2200 },
    { name: "Page C", uv: 240, pv: 2100, amt: 2200 },
    { name: "Page D", uv: 80, pv: 2100, amt: 2200 },
  ]
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Tổng doanh thu</CardTitle>
          <CardDescription>Tổng doanh thu của bạn</CardDescription>
        </CardHeader>
        <CardContent>0</CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
