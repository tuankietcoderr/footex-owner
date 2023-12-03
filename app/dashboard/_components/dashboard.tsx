import CustomerBook from "./customer-book"
import CustomerCancel from "./customer-cancel"
import HelloDashboard from "./hello-card"
import Profit from "./profit"
import Rating from "./rating"
import Revenue from "./revenue"
import Transactions from "./transactions"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[60%_auto_auto]">
      <HelloDashboard />
      <Profit />
      <Transactions />
      <Revenue />
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <CustomerBook />
        <CustomerCancel />
        <Rating />
      </div>
    </div>
  )
}

export default Dashboard
