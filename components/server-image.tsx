"use client"
import Image, { ImageProps } from "next/image"
import React, { memo } from "react"

const ServerImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} loader={({ src, width }) => `${src}?w=${width}`} />
}

export default memo(ServerImage)
