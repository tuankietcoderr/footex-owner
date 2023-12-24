import React from "react"
import BookForm from "./_components/book-form"
import { ParamsProps } from "@/types/params"
import { getFieldBookedQueue } from "@/actions/field-booked-queue-actions"
import IFieldBookedQueue from "@/interface/IFieldBookedQueue"

const page = async ({ params: { field_id } }: ParamsProps) => {
  const { code, message, success, data } = await getFieldBookedQueue(field_id)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }

  const bookedFields = data as IFieldBookedQueue[]
  return (
    <div>
      <BookForm fieldId={field_id} bookedFields={bookedFields} />
    </div>
  )
}

export default page
