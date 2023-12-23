import { getObjectRates } from "@/actions/rate-actions"
import IRate, { ERate } from "@/interface/IRate"
import AvgRating from "./avg-rating"
import AllRatings from "./all-ratings"

type Props = {
  objectType: ERate
  objectId: string
}

const Rating = async ({ objectType, objectId }: Props) => {
  const { data, success, code, message } = await getObjectRates(objectType, objectId)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const rates = data ?? ([] as IRate[])
  return (
    <div>
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Đánh giá</h4>
        <AvgRating rates={rates} />
        <AllRatings rates={rates} />
      </div>
    </div>
  )
}

export default Rating
