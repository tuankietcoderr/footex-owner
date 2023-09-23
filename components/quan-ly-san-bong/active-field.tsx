import useFieldStore from "@/store/useFieldStore"
import React from "react"
import BlurElement from "../blur-element"
import dynamic from "next/dynamic"
import EmptyResult from "../result/empty-result"
import ErrorResult from "../result/error-result"

const FieldItem = dynamic(() => import("./field-item").then((mod) => mod.default), { ssr: false })

const ActiveField = () => {
  const { fields } = useFieldStore()
  const activeFields = fields?.filter((field) => !field.is_being_used)
  return (
    <div className="overflow-auto">
      <h2 className="mb-2 text-2xl font-bold">Sân đang trống</h2>
      <div className="scrollbar-rounded flex gap-4 overflow-auto pb-4 scrollbar-thin scrollbar-thumb-muted">
        {activeFields === undefined ? (
          Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
            <BlurElement key={index} wrapperClassname="min-w-[300px] h-[400px]" />
          ))
        ) : activeFields !== null ? (
          activeFields.length > 0 ? (
            activeFields.map((field) => <FieldItem key={field._id} {...field} />)
          ) : (
            <EmptyResult />
          )
        ) : (
          <ErrorResult />
        )}
      </div>
    </div>
  )
}

export default ActiveField
