import { ClassValue } from "clsx"
import React from "react"

interface ColumnProps<T = any> {
  headRef: keyof T | string
  render: (row: T) => React.ReactNode
}

interface TableProps<T = any> {
  data: T[]
  columns: ColumnProps<T>[]
  headers: string[]
  className?: ClassValue
  empty?: string | React.ReactNode
}

export { TableProps, ColumnProps }
