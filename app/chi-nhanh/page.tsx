import BranchSwitcher from "@/components/nav/branch-switcher"

const page = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-auto">
      <div>
        <BranchSwitcher branchId="" />
      </div>
    </div>
  )
}

export default page
