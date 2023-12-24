import { ParamsProps } from "@/types/params"
import CreateFieldForm from "./_components/create-field-form"

const page = async ({ params: { id } }: ParamsProps) => {
  return (
    <div>
      <CreateFieldForm branchId={id} />
    </div>
  )
}

export default page
