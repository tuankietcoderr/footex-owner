import React, { ElementRef, memo } from "react"
import { Loader2 } from "lucide-react"

// eslint-disable-next-line react/display-name, no-empty-pattern
const Spinner = React.forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <div className="grid place-items-center" ref={ref}>
      <Loader2 className="animate-spin" />
    </div>
  )
})

export default memo(Spinner)
