import { toDot } from "@/lib/converter"
import { ArrowDown, PieChart } from "lucide-react"
import StatisticItem from "./statistic-item"

const Profit = () => {
  return (
    <StatisticItem
      title="Lợi nhuận"
      icon={PieChart}
      iconProps={{
        className: "text-blue-500",
      }}
      footer={
        <div className="flex items-center gap-2">
          <ArrowDown className="text-red-500" />
          <span className="text-sm font-semibold text-red-500">-1.2%</span>
        </div>
      }
    >
      <p>
        VND <span className="text-xl font-semibold">{toDot(500000)}</span>
      </p>
    </StatisticItem>
  )
}

export default Profit
