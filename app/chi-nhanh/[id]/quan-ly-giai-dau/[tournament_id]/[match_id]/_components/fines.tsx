import {
  addFineForPlayer,
  createCardFine,
  deleteFine,
  removeFineForPlayer,
} from "@/actions/match-actions"
import Table from "@/components/table"
import { ColumnProps } from "@/components/table/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ICardFine, { ECard } from "@/interface/ICardFine"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { vilizeCardFine } from "@/utils/status"
import { zodResolver } from "@hookform/resolvers/zod"
import { RectangleVertical } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type Props = {
  leftTeam: ITeam
  rightTeam: ITeam
  fines: ICardFine[]
  matchId: string
}

const formSchema = z.object({
  player: z.string().min(1, "Cầu thủ không được để trống"),
  card: z.string().min(1, "Thẻ không được để trống"),
})

type FormSchema = z.infer<typeof formSchema>

const Fines = ({ fines, leftTeam, rightTeam, matchId }: Props) => {
  const [_fines, setFines] = React.useState<ICardFine[]>(fines)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card: "",
      player: "",
    },
  })

  useEffect(() => {
    setFines(fines)
  }, [fines])

  const teams = [leftTeam, rightTeam]
  const players = teams.flatMap((team) => team.members as IGuest[])
  const [open, setOpen] = React.useState(false)

  const headers = ["Thẻ phạt", "Cầu thủ", "Hành động"]
  const columns: ColumnProps<ICardFine>[] = [
    {
      headRef: "Thẻ phạt",
      render: ({ cards, _id }) => (
        <div className="flex flex-wrap justify-center space-x-1">
          {cards.map((card, index) => (
            <Popover key={card + index}>
              <PopoverTrigger>
                <RectangleVertical
                  size={30}
                  className={
                    card === ECard.RED
                      ? "fill-red-400 text-red-400"
                      : "fill-yellow-200 text-yellow-200"
                  }
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit">
                <Button variant={"destructive"} onClick={() => removeFine(_id!, card)}>
                  Xóa
                </Button>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      ),
    },
    {
      headRef: "Cầu thủ",
      render: (fine) => <div>{(fine.player as IGuest).name}</div>,
    },
    {
      headRef: "Hành động",
      render: (fine) => (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"ghost"} className="text-primary">
                Thêm thẻ
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Select onValueChange={(v) => addFine(fine?._id!, v as ECard)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại thẻ phạt" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(ECard).map((card, index) => (
                    <SelectItem key={card + index} value={card}>
                      {vilizeCardFine(card)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </PopoverContent>
          </Popover>
          <Button
            variant={"ghost"}
            className="text-destructive"
            onClick={() => deleteFinePermanently(fine?._id!)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  async function addFine(fineId: string, card: ECard) {
    toast.loading("Đang thêm thẻ phạt...", {
      duration: Infinity,
    })
    const { success, message } = await addFineForPlayer(matchId, fineId, card)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  async function removeFine(fineId: string, card: ECard) {
    toast.loading("Đang xóa thẻ phạt...", {
      duration: Infinity,
    })
    const { success, message } = await removeFineForPlayer(matchId, fineId, card)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  async function deleteFinePermanently(fineId: string) {
    toast.loading("Đang xóa hình phạt...", {
      duration: Infinity,
    })
    const { success, message } = await deleteFine(matchId, fineId)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const filteredFines = fines.filter((fine) => {
      const scoreBy = (fine.player as IGuest).name
      return scoreBy.includes(value)
    })
    setFines(filteredFines)
  }

  function onChangeCard(value: string) {
    const filteredFines = fines.filter((fine) => fine.cards.includes(value as ECard))
    setFines(filteredFines)
  }

  function onReset() {
    setFines(fines)
  }

  async function onSubmit(data: FormSchema) {
    toast.loading("Đang tạo thẻ phạt...", {
      duration: Infinity,
    })
    const fine: ICardFine = {
      cards: [data.card as ECard],
      player: data.player,
    }

    const { success, message } = await createCardFine(matchId, fine)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm bàn thắng..." onChange={onSearch} />
        <Select onValueChange={onChangeCard}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Loại thẻ" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {Object.values(ECard).map((card) => (
              <SelectItem key={card} value={card}>
                {vilizeCardFine(card)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button>Thêm thẻ phạt</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Thêm thẻ phạt</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="player"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phút</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn cầu thủ bị phạt" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {players.map((player) => (
                            <SelectItem key={player?._id!} value={player?._id!}>
                              {player.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="card"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thẻ phạt</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn loại thẻ phạt" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(ECard).map((card) => (
                            <SelectItem key={card} value={card}>
                              {vilizeCardFine(card)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button>Tạo</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table headers={headers} columns={columns} data={_fines} className="border shadow-sm" />
    </div>
  )
}

export default Fines
