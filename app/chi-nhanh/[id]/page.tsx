import ROUTE from "@/constants/route"
import { ParamsProps } from "@/types/params"
import { redirect } from "next/navigation"

const page = async ({ params: { id } }: ParamsProps) => {
  redirect(ROUTE.BRANCH.DASHBOARD.replace(":id", id))
}

export default page
