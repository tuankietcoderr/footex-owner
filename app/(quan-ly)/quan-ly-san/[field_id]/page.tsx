import { API_URL } from "@/api/instance"
import ServerImage from "@/components/server-image"
import MySwiper from "@/components/quan-ly-san-bong/swiper"
import IField, { EFieldStatus } from "@/interface/IField"
import { toDot } from "@/lib/converter"
import axios from "axios"
import Image from "next/image"
import React from "react"
import { SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import FieldAction from "@/components/quan-ly-san-bong/field-action"
import API_ROUTE from "@/constants/api-route"

type Props = {
  params: {
    field_id: string
  }
}

const page = async ({ params: { field_id } }: Props) => {
  console.log({ field_id })
  const res = await axios.get(`${API_URL}/${API_ROUTE.FIELD.ID.replace(":id", field_id)}`)
  if (!res.data?.success) {
    return <div>404</div>
  }
  const { name, price, description, image, status } = res.data.data as IField
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <ServerImage
          src={
            image ||
            "https://img.freepik.com/premium-vector/football-field-with-green-grass-vector-illustration_515038-2894.jpg"
          }
          alt={name}
          className="w-full rounded-md object-cover shadow-md"
          width={600}
          height={213}
        />
        <FieldAction />
      </div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <h1 className="text-3xl font-bold">{name}</h1>
        {status === EFieldStatus.ACTIVE ? (
          <span className="text-green-500">Đang trống</span>
        ) : (
          <span className="text-red-400">Đang được sử dụng</span>
        )}
        <p className="font-semibold text-red-400">{toDot(price ?? 0)}VND/giờ</p>
      </div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <p>Mô tả: {description}</p>
      </div>
      <div>{/* <MySwiper data={[image, image, image]} /> */}</div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <h4 className="text-xl font-semibold">Danh sách khách đặt trước</h4>
      </div>
    </div>
  )
}

export default page
