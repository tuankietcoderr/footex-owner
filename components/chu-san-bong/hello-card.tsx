"use client"
import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import HiddenPerson from "@/illustrations/hidden-person"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import useUserStore from "@/store/useUserStore"
import BlurElement from "../blur-element"

const HelloCard = () => {
  const { user } = useUserStore()
  return (
    <BlurElement>
      <Card className="relative flex h-full flex-col justify-between overflow-hidden">
        <CardHeader className="text-2xl">
          <CardTitle>
            Xin chào <b className="underline">{user?.name}</b>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p className="z-[2]">
              Chào mừng bạn đến với trang quản lý dành cho{" "}
              <strong className="underline">Chủ sân bóng</strong>!
            </p>
            <HiddenPerson
              fill="var(--primary)"
              className="absolute -right-6 bottom-4 z-[1] w-32 fill-primary dark:opacity-50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="z-[2] flex gap-4">
            <Button>
              <Plus size={20} />
              <span className="ml-2">Thêm sân</span>
            </Button>
            <Button variant={"outline"}>
              <Plus size={20} />
              <span className="ml-2">Thêm giải đấu</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </BlurElement>
  )
}

export default HelloCard
