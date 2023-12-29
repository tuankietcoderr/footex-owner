import BranchSwitcher from "@/components/nav/branch-switcher"
import Base from "./_components/base"

const page = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-auto">
      <Base>
        <div>
          <BranchSwitcher branchId="" />
        </div>
      </Base>
    </div>
  )
}

export default page
