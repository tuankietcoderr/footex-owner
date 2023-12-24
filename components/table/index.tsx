import React from "react"
import { TableProps } from "./table"
import { cn } from "@/lib/utils"

function Table<T extends any>({
  headers = [],
  columns = [],
  data = [],
  className,
  empty = "Không có dữ liệu",
}: TableProps<T>) {
  if (headers.length !== columns.length)
    throw new Error("Headers and columns must have the same length")
  const renderHeaders = () => {
    return headers.map((header) => (
      <th scope="col" className="px-6 py-3" key={header}>
        {header}
      </th>
    ))
  }

  const renderColumns = (row: T) => {
    const sortedColumns = columns.sort(
      (a, b) => headers.indexOf(a.headRef.toString()) - headers.indexOf(b.headRef.toString())
    )
    return sortedColumns.map((column, colIndex) => {
      return (
        <td className="px-6 py-4" key={colIndex}>
          {column.render(row)}
        </td>
      )
    })
  }

  return (
    <table
      className={cn(
        "w-full text-center text-sm text-gray-500 rtl:text-right dark:text-gray-400",
        className
      )}
    >
      <thead className="bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              {renderColumns(row)}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="py-4 text-center">
              {empty}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Table
