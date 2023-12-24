import ServerImage from "@/components/server-image"
import { CardDescription } from "@/components/ui/card"
import IBranch from "@/interface/IBranch"
import IField from "@/interface/IField"
import { toAddress, toDot } from "@/lib/converter"
import { Circle, CircleDollarSign, MapPin, Users } from "lucide-react"
import UpdateFieldStatus from "./update-field-status"
import UpdateFieldModal from "@/components/modal/update-field-info-modal"
import { Button } from "@/components/ui/button"

type Props = {
  field: IField
  branchId: string
}

const FieldMainInfo = ({ field, branchId }: Props) => {
  const { image, price, type, status, name } = field
  const branch = field.branch as IBranch
  return (
    <div className="grid grid-cols-[18rem_auto] space-x-4">
      <div className="grid place-items-center rounded-md border shadow-sm">
        <ServerImage
          src={image || ""}
          alt={name}
          width={600}
          height={800}
          className="max-h-[14rem] w-full object-cover p-2"
        />
      </div>
      <div className="flex justify-between rounded-md border p-4 shadow-sm">
        <div className="flex flex-col justify-between space-y-2">
          <h1 className="text-4xl font-bold">{name}</h1>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Circle size={16} />
              <UpdateFieldStatus status={status!} fieldId={field._id!} />
            </div>
            <div className="flex space-x-2">
              <Users size={16} />
              <CardDescription>
                Sân <b>{type}</b>
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <MapPin size={16} />
              <CardDescription className="flex-1">{toAddress({ ...branch })}</CardDescription>
            </div>
            <div className="flex space-x-2">
              <CircleDollarSign size={16} />
              <CardDescription>
                <span className="font-semibold">{toDot(price ?? 0)}</span> VND/giờ
              </CardDescription>
            </div>
          </div>
        </div>
        <UpdateFieldModal
          initialData={field}
          fieldId={field?._id!}
          trigger={<Button className="self-end">Cập nhật thông tin sân</Button>}
        />
      </div>
    </div>
  )
}

export default FieldMainInfo
