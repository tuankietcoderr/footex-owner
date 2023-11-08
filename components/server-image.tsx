"use client"
import Image, { ImageProps } from "next/image"
import React from "react"

const ServerImage = (props: ImageProps) => {
  return <Image {...props} alt={props.alt} loader={({ src }) => src} />
}

export default ServerImage
