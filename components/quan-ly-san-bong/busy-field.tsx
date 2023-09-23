import useFieldStore from "@/store/useFieldStore"
import React from "react"
import dynamic from "next/dynamic"
import IField from "@/interface/IField"
import BlurElement from "../blur-element"
import Empty from "@/illustrations/empty"
import EmptyResult from "../result/empty-result"
import ErrorResult from "../result/error-result"

const FieldItem = dynamic(() => import("./field-item").then((mod) => mod.default), { ssr: true })

const BusyField = () => {
  const { fields } = useFieldStore()
  const busyFields = fields?.filter((field) => field.is_being_used)
  return (
    <div className="overflow-auto">
      <h2 className="mb-2 text-2xl font-bold">Sân đang được sử dụng</h2>
      <div className="scrollbar-rounded flex gap-4 overflow-auto pb-4 scrollbar-thin scrollbar-thumb-muted">
        {busyFields === undefined ? (
          Array.from({ length: 5 }, () => ({}) as IField).map((field, index) => (
            <FieldItem key={index} {...field} />
          ))
        ) : busyFields !== null ? (
          busyFields.length > 0 ? (
            busyFields.map((field) => <FieldItem key={field._id} {...field} />)
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

export default BusyField
