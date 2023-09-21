import { ArrowUp, UserCheck } from "lucide-react"
import StatisticItem from "./statistic-item"

const CustomerBook = () => {
  return (
    <StatisticItem
      title="Khách đặt sân"
      icon={UserCheck}
      iconProps={{
        className: "text-green-500",
      }}
      footer={
        <div className="flex items-center gap-2">
          <ArrowUp className="text-green-500" />
          <span className="text-sm font-semibold text-green-500">+1.2%</span>
        </div>
      }
    >
      <p className="text-xl font-semibold">1</p>
    </StatisticItem>
  )
}

export default CustomerBook
