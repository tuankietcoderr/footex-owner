import UnAuthorized from "@/components/un-authorized"
import UnBranch from "@/components/un-branch"
import ROUTE from "@/constants/route"
import { getSession } from "@/services/auth/cookie-session"
import { redirect } from "next/navigation"

const page = async () => {
  const { isLogin } = await getSession()
  if (!isLogin) {
    redirect(ROUTE.AUTH.SIGN_IN)
  }
  redirect(ROUTE.BRANCH.INDEX)
}

export default page
