"use client"
import React, { useEffect, useState } from "react"
import { fetchAddress, fetchAddressDetail } from "./api"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useFormContext } from "react-hook-form"
import IOwner from "@/interface/IOwner"
import { Input } from "../ui/input"

type TAddress = {
  name: string
  code: number
}

type TProvince = TAddress & {
  districts: TAddress[]
}

type TDistrict = TAddress & {
  wards: TAddress[]
}

type TWard = TAddress

type Props = {
  showStreet?: boolean
  showHouseNumber?: boolean
}

const Address = ({ showHouseNumber = false, showStreet = false }: Props) => {
  const form = useFormContext<IOwner>()
  const [city, setCity] = useState<TProvince[]>([])
  const [cityLoading, setCityLoading] = useState(false)

  const [district, setDistrict] = useState<TDistrict[]>([])
  const [districtLoading, setDistrictLoading] = useState(false)

  const [ward, setWard] = useState<TWard[]>([])
  const [wardLoading, setWardLoading] = useState(false)

  const onPressFetchCity = async () => {
    if (city.length === 0) {
      try {
        setCityLoading(true)
        const res = await fetchAddress("p")
        setCity(res)
      } catch {
        setCity([])
      } finally {
        setCityLoading(false)
      }
    }
  }

  const onPressFetchDistrict = async (__city: string) => {
    try {
      setDistrictLoading(true)
      const _city = city.find((item: any) => item.name === __city)
      const cityCode = _city?.code ?? 1
      const res = await fetchAddressDetail("p", cityCode.toString(), 2)
      setDistrict(res?.districts || [])
    } catch {
      setDistrict([])
    } finally {
      setDistrictLoading(false)
    }
  }

  const onPressFetchWard = async (__district: string) => {
    try {
      setWardLoading(true)
      const _district = district.find((item: any) => item.name === __district)
      const districtCode = _district?.code ?? 1
      const res = await fetchAddressDetail("d", districtCode.toString(), 2)
      setWard(res?.wards || [])
    } catch {
      setWard([])
    } finally {
      setWardLoading(false)
    }
  }

  return (
    <>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Địa chỉ</FormLabel>
            <Select
              onOpenChange={(open) => {
                if (open) onPressFetchCity()
              }}
              onValueChange={(v) => {
                field.onChange(v)
                onPressFetchDistrict(v)
                setWard([])
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn tỉnh/thành phố" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-auto" defaultValue={field.value}>
                {city.length > 0 &&
                  city.map((item: any) => (
                    <SelectItem value={item.name} key={item.codename}>
                      {item.name}
                    </SelectItem>
                  ))}

                {cityLoading && <p className="text-center text-xs">Đang tải...</p>}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {district.length > 0 && (
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(v) => {
                  field.onChange(v)
                  onPressFetchWard(v)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quận/huyện" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-auto" defaultValue={field.value}>
                  {district.length > 0 &&
                    district.map((item: any) => (
                      <SelectItem value={item.name} key={item.codename}>
                        {item.name}
                      </SelectItem>
                    ))}
                  {districtLoading && <p className="text-center text-xs">Đang tải...</p>}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {ward.length > 0 && (
        <FormField
          control={form.control}
          name="ward"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phường/xã" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] overflow-auto" defaultValue={field.value}>
                  {ward.length > 0 &&
                    ward.map((item: any) => (
                      <SelectItem value={item.name} key={item.codename}>
                        {item.name}
                      </SelectItem>
                    ))}
                  {wardLoading && <p className="text-center text-xs">Đang tải...</p>}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {ward.length > 0 && showStreet && (
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đường</FormLabel>
              <FormControl>
                <Input placeholder="Đường 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {ward.length > 0 && showHouseNumber && (
        <FormField
          control={form.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số nhà</FormLabel>
              <FormControl>
                <Input placeholder="F30/15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}

export default Address
