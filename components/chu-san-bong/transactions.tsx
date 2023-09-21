import { ArrowRightLeft, ArrowUp } from "lucide-react"
import StatisticItem from "./statistic-item"
import { toDot } from "@/lib/converter"

const Transactions = () => {
  return (
    <StatisticItem
      title="Giao dịch"
      icon={ArrowRightLeft}
      iconProps={{
        className: "text-pink-500",
      }}
      footer={
        <div className="flex items-center gap-2">
          <ArrowUp className="text-green-500" />
          <span className="text-sm font-semibold text-green-500">+1.2%</span>
        </div>
      }
    >
      <p>
        VND <span className="text-xl font-semibold">{toDot(500000)}</span>
      </p>
    </StatisticItem>
  )
}

export default Transactions
