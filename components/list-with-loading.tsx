import React from "react"
import Spinner from "./spinner"

type Props<T extends any> = {
  isLoading: boolean
  data: T[]
  renderItem: (item: T, index: number) => React.JSX.Element
  emptyText?: string
  contentContainerClassName?: string
  listFooter?: React.ReactNode
}

const ListWithLoading = <T extends any>({
  isLoading = false,
  data = [],
  renderItem,
  emptyText,
  contentContainerClassName,
  listFooter,
}: Props<T>) => {
  return (
    <div className={contentContainerClassName}>
      {isLoading ? (
        <Spinner />
      ) : data?.length > 0 ? (
        data.map((item, index) => renderItem(item, index))
      ) : (
        <p className="text-center text-gray-400">{emptyText || "Không có dữ liệu"}</p>
      )}
      {listFooter}
    </div>
  )
}

export default ListWithLoading
