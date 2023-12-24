import { getFieldById } from "@/actions/field-actions"
import { Separator } from "@/components/ui/separator"
import IField from "@/interface/IField"
import FieldMainInfo from "./_components/field-main-info"
import Rating from "@/components/rating"
import { ERate } from "@/interface/IRate"
import { LayoutParamsProps } from "@/types/params"

const layout = async ({ children, params: { field_id, id } }: LayoutParamsProps) => {
  const { success, data, code, message } = await getFieldById(field_id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const field = data as IField
  return (
    <div className="space-y-4">
      <FieldMainInfo field={field} branchId={id} />
      {children}
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Mô tả</h4>
        <Separator />
        <p className="mt-2 whitespace-pre-wrap">{field.description}</p>
      </div>
      <Rating objectId={field_id} objectType={ERate.FIELD} />
    </div>
  )
}

export default layout
