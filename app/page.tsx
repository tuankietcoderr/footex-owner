import ROUTE from "@/constants/route"
import { redirect } from "next/navigation"

const page = () => {
  redirect(ROUTE.DASHBOARD)
}

export default page
