import { API_URL } from "@/api/instance"
import ServerImage from "@/components/server-image"
import MySwiper from "@/components/quan-ly-san-bong/swiper"
import IField from "@/interface/IField"
import { toDot } from "@/lib/converter"
import axios from "axios"
import Image from "next/image"
import React from "react"
import { SwiperSlide } from "swiper/react"
import { Button } from "@/components/ui/button"
import FieldAction from "@/components/quan-ly-san-bong/field-action"

type Props = {
  params: {
    field_id: string
  }
}

const page = async ({ params: { field_id } }: Props) => {
  const res = await axios.get(`${API_URL}/field/${field_id}`)
  if (!res.data?.success) {
    return <div>404</div>
  }
  const { is_being_used, name, organization, price, description, images, rating, thumbnail } = res
    .data.data as IField
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <ServerImage
          src={thumbnail}
          alt={name}
          className="w-full rounded-md object-cover shadow-md"
          width={600}
          height={213}
        />
        <FieldAction />
      </div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <h1 className="text-3xl font-bold">{name}</h1>
        {!is_being_used ? (
          <span className="text-green-500">Đang trống</span>
        ) : (
          <span className="text-red-400">Đang được sử dụng</span>
        )}
        <p className="font-semibold text-red-400">{toDot(price ?? 0)}VND/giờ</p>
      </div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <p>Mô tả: {description}</p>
      </div>
      <div>
        <MySwiper data={[thumbnail, thumbnail, thumbnail]} />
      </div>
      <div className="rounded-md border border-border p-4 shadow-md">
        <h4 className="text-xl font-semibold">Danh sách khách đặt trước</h4>
      </div>
    </div>
  )
}

export default page
