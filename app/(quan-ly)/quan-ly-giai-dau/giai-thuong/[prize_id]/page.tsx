import React from "react"

const page = ({
  params: { prize_id },
}: {
  params: {
    prize_id: string
  }
}) => {
  return <div>{prize_id}</div>
}

export default page
