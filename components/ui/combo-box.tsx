"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface IComboBox {
    value: string;
    label: string;
}

type Props = {
    data: IComboBox[];
    initialText?: string;
    onChange?: (value: string) => void;
    className?: string;
    value?: string;
    extraText?: string;
}

export function ComboBox({data,initialText="Chọn", onChange, className, value: _value, extraText} : Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(_value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between",className)}
        >
          {value
            ? data.find((d) => d.value === value)?.label
            : initialText}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Tìm kiếm..." className="h-9" />
          <CommandEmpty>Không tìm thấy</CommandEmpty>
          <CommandGroup>
            <div className="max-h-[200px] overflow-auto scrollbar-thin scrollbar-thumb-primary scrollbar-rounded">
            {data.map((d) => (
              <CommandItem
              key={d.value}
              value={d.value}
                onSelect={(currentValue: any) => {
                  setValue(currentValue === value ? "" : currentValue)
                  onChange && onChange(currentValue)
                  setOpen(false)
                }}
              >
                {extraText} {d.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === d.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
              </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
