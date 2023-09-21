import { toDot } from "@/lib/converter"
import { cn } from "@/lib/utils"
import { LucideIcon, LucideProps } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { PropsWithChildren } from "react"
import React from "react"

type StatisticItemProps = {
  title: string
  wrapperClassName?: string
  icon?: LucideIcon
  footer?: React.ReactNode
  iconProps?: LucideProps
} & PropsWithChildren

const StatisticItem = ({
  title,
  wrapperClassName,
  icon: Icon,
  children,
  footer,
  iconProps,
}: StatisticItemProps) => {
  return (
    <Card className={cn("relative z-[2] overflow-hidden", wrapperClassName)}>
      <CardHeader className="z-[4]">
        <CardTitle>{Icon && <Icon size={44} strokeWidth={1.5} {...iconProps} />}</CardTitle>
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="">{footer}</CardFooter>
    </Card>
  )
}

export default StatisticItem
