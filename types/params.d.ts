import { PropsWithChildren } from "react"

interface ParamsProps {
  params: { [key: string]: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

type LayoutParamsProps = {
  params?: any
} & PropsWithChildren

export { ParamsProps, LayoutParamsProps }
