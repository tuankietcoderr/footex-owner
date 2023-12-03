import BlurElement from "@/components/blur-element"
import usePrizeStore from "@/store/usePrizeStore"
import React from "react"
import EmptyResult from "@/components/result/empty-result"
import ErrorResult from "@/components/result/error-result"
import dynamic from "next/dynamic"

const PrizeItem = dynamic(() => import("./prize-item").then((mod) => mod.default), {
  ssr: false,
})

const AllPrizes = () => {
  const { prizes } = usePrizeStore()
  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {prizes === undefined ? (
          Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
            <BlurElement key={index} wrapperClassname="min-w-[300px] h-[400px]" />
          ))
        ) : prizes !== null ? (
          prizes.length > 0 ? (
            prizes.map((prize) => <PrizeItem key={prize._id} {...prize} />)
          ) : (
            <div className="col-span-3">
              <EmptyResult />
            </div>
          )
        ) : (
          <ErrorResult />
        )}
      </div>
    </div>
  )
}

export default AllPrizes
