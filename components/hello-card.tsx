import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

type Props = {
  title: string | React.ReactNode
  content?: string | React.ReactNode
  footer?: string | React.ReactNode
}

const HelloCard = ({ title, footer, content }: Props) => {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden">
      <CardHeader className="text-2xl">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>
        <div className="z-[2] flex gap-4">{footer}</div>
      </CardFooter>
    </Card>
  )
}

export default HelloCard
