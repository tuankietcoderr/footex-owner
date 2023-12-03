import React, { useState } from "react"
import Spinner from "./spinner"
import { cn } from "@/lib/utils"
type Props = {
  showOverlay?: boolean
}
const LoadingOverlay = ({ showOverlay = true }: Props) => {
  return (
    <div
      className={cn(
        "inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        showOverlay && "fixed"
      )}
    >
      <Spinner />
    </div>
  )
}

export default LoadingOverlay
