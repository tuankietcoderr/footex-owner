"use client"
import { Plus } from "lucide-react"
import { Card, CardDescription } from "./ui/card"

type Props = {
  onClick?: () => void
}

const CreateButton = ({ onClick }: Props) => {
  const onClickBtn = () => {
    onClick && onClick()
  }
  return (
    <Card className="grid h-[200px] place-items-center bg-card">
      <CardDescription
        onClick={onClickBtn}
        className="cursor-pointer rounded-full bg-muted p-8 transition-all sm:hover:scale-105 hover:sm:opacity-70"
      >
        <Plus size={48} className="text-primary" />
      </CardDescription>
    </Card>
  )
}

export default CreateButton
