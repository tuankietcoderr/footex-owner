import useFieldStore from "@/store/useFieldStore"
import dynamic from "next/dynamic"
import { useCallback, useMemo, useState } from "react"
import { EFieldStatus } from "@/interface/IField"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import BlurElement from "@/components/blur-element"
import EmptyResult from "@/components/result/empty-result"
import ErrorResult from "@/components/result/error-result"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vilizeFieldStatus } from "@/utils/status"

const FieldItem = dynamic(() => import("./field-item").then((mod) => mod.default), { ssr: false })

const AllField = () => {
  const { fields } = useFieldStore()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const filter = searchParams.get("filter") ?? "all"
  const setFilter = useCallback(
    (filter: string) => {
      const newParams = new URLSearchParams(searchParams.toString())
      newParams.set("filter", filter)
      router.replace(`${pathname}?${newParams.toString()}`)
    },
    [searchParams, pathname, router]
  )
  const filteredFields = useMemo(
    () => fields?.filter((tournament) => tournament.status === filter || filter === "all"),
    [filter, fields]
  )

  const fieldStatuses = useMemo(() => Object.values(EFieldStatus), [])
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
            <div className="col-span-3">
              <EmptyResult />
            </div>
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
        <Tabs defaultValue={filter}>
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              Tất cả
            </TabsTrigger>
            {fieldStatuses.map((status) => (
              <TabsTrigger key={status} value={status} onClick={() => setFilter(status)}>
                {vilizeFieldStatus(status)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={filter}>
            <Fields />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AllField
