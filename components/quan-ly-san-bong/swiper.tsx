"use client"
import Image from "next/image"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import { EffectFade, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
type Props = {
  data: any[]
}

const MySwiper = ({ data = [] }: Props) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
        type: "bullets",
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination, EffectFade]}
      className="shadow-md"
      slidesPerView={1}
      centeredSlides
      effect="fade"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <Image
            src={item}
            className="w-full rounded-md object-contain"
            width={100}
            height={100}
            alt={item}
            loader={({ src }) => src}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default MySwiper
