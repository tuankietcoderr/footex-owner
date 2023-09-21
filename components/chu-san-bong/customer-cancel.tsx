import { ArrowDown, UserX } from "lucide-react"
import StatisticItem from "./statistic-item"
import { toDot } from "@/lib/converter"

const CustomerCancel = () => {
  return (
    <StatisticItem
      title="Khách hủy sân"
      icon={UserX}
      iconProps={{
        className: "text-red-500",
      }}
      footer={
        <div className="flex items-center gap-2">
          <ArrowDown className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">-1.2%</span>
        </div>
      }
    >
      <p className="text-xl font-semibold">1</p>
    </StatisticItem>
  )
}

export default CustomerCancel
