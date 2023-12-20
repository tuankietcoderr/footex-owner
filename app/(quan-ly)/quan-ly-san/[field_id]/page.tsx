import { API_URL } from "@/api/instance"
import ServerImage from "@/components/server-image"
import API_ROUTE from "@/constants/api-route"
import IField from "@/interface/IField"
import { toDot } from "@/lib/converter"
import AllBookedGuests from "./_components/all-booked-guests"
import FieldAction from "./_components/field-action"
import UpdateFieldStatus from "./_components/update-field-status"

type Props = {
  params: {
    field_id: string
  }
}

const page = async ({ params: { field_id } }: Props) => {
  try {
    const res = await fetch(`${API_URL}/${API_ROUTE.FIELD.ID.replace(":id", field_id)}`, {
      cache: "no-store",
    })
    const data = await res.json()
    if (!data?.success) {
      return <div>404</div>
    }
    const { name, price, description, image, status } = data.data as IField
    return (
      <div className="flex flex-col gap-4">
        <div className="relative">
          <ServerImage
            src={
              image ||
              "https://img.freepik.com/premium-vector/football-field-with-green-grass-vector-illustration_515038-2894.jpg"
            }
            alt={name}
            className="max-h-[20rem] w-full rounded-md object-cover shadow-md"
            width={600}
            height={213}
          />
          <FieldAction {...data.data} />
        </div>
        <div className="flex flex-col gap-2 rounded-md border border-border p-4 shadow-md">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-2">
            <p>Trạng thái: </p>
            <UpdateFieldStatus fieldId={field_id} status={status!} />
          </div>
          <p className="font-semibold text-red-400">{toDot(price ?? 0)}VND/giờ</p>
        </div>
        <div className="rounded-md border border-border p-4 shadow-md">
          <h4 className="font-bold">Mô tả</h4>
          <p className="whitespace-pre-wrap">{description}</p>
        </div>
        <AllBookedGuests field_id={field_id} />
      </div>
    )
  } catch (err) {
    return <div>{err?.toString()}</div>
  }
}

export default page
