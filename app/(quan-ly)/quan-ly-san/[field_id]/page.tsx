import IField from "@/interface/IField"
import axios from "axios"
import React from "react"

type Props = {
  params: {
    field_id: string
  }
}

const page = async ({ params: { field_id } }: Props) => {
  const res = await axios.get(`http://localhost:2003/api/field/${field_id}`)
  if (res.data?.success) {
    const field = res.data.data as IField
    return <div>{field.name}</div>
  } else {
    return <div>404</div>
  }
}

export default page
