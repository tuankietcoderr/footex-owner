import useFieldStore from "@/store/useFieldStore"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
import BlurElement from "../blur-element"
import EmptyResult from "../result/empty-result"
import ErrorResult from "../result/error-result"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { EFieldStatus } from "@/interface/IField"

const FieldItem = dynamic(() => import("./field-item").then((mod) => mod.default), { ssr: false })

const AllField = () => {
  const { fields } = useFieldStore()
  const [filter, setFilter] = useState("all")
  const filteredFields = fields?.filter((field) =>
    filter === "busy"
      ? field.status === EFieldStatus.BUSY
      : filter === "active"
      ? field.status === EFieldStatus.ACTIVE
      : true
  )
  const Fields = useCallback(() => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {filteredFields === undefined ? (
          Array.from({ length: 5 }, (_, index) => index).map((_, index) => (
            <BlurElement key={index} wrapperClassname="min-w-[300px] h-[400px]" />
          ))
        ) : filteredFields !== null ? (
          filteredFields.length > 0 ? (
            filteredFields.map((field) => <FieldItem key={field._id} {...field} />)
          ) : (
            <EmptyResult />
          )
        ) : (
          <ErrorResult />
        )}
      </div>
    )
  }, [filteredFields])

  return (
    <div className="overflow-hidden">
      <div>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilter("active")}>
              Đang trống
            </TabsTrigger>
            <TabsTrigger value="busy" onClick={() => setFilter("busy")}>
              Đang được sử dụng
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Fields />
          </TabsContent>
          <TabsContent value="active">
            <Fields />
          </TabsContent>
          <TabsContent value="busy">
            <Fields />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AllField
