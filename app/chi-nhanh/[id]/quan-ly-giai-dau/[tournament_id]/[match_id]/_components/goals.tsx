"use client"
import { createGoal, removeGoal } from "@/actions/match-actions"
import AppAvatar from "@/components/app-avatar"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import IGoalDetail from "@/interface/IGoalDetail"
import IGuest from "@/interface/IGuest"
import ITeam from "@/interface/ITeam"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

type Props = {
  leftTeam: ITeam
  rightTeam: ITeam
  goals: IGoalDetail[]
  matchId: string
}

const formSchema = z.object({
  scoreAtMinute: z
    .number()
    .min(1, "Phút không được nhỏ hơn 1")
    .max(120, "Phút không được lớn hơn 120"),
  scoreBy: z.string().min(1, "Cầu thủ không được để trống"),
  team: z.string().min(1, "Đội không được để trống"),
})

type FormSchema = z.infer<typeof formSchema>

const Goals = ({ goals, leftTeam, rightTeam, matchId }: Props) => {
  const [_goals, setGoals] = React.useState<IGoalDetail[]>(goals)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scoreAtMinute: 1,
      scoreBy: "",
      team: "",
    },
  })

  useEffect(() => {
    setGoals(goals)
  }, [goals])

  const teams = [leftTeam, rightTeam]
  const [open, setOpen] = React.useState(false)

  const headers = ["Đội", "Phút", "Cầu thủ", "Hành động"]
  const columns: ColumnProps<IGoalDetail>[] = [
    {
      headRef: "Đội",
      render: (goal) => (
        <div className="flex justify-center">
          <AppAvatar src={(goal.team as ITeam).logo} alt={(goal.team as ITeam).name} />
        </div>
      ),
    },
    {
      headRef: "Phút",
      render: (goal) => <div>{goal.scoreAtMinute}</div>,
    },
    {
      headRef: "Cầu thủ",
      render: (goal) => <div>{(goal.scoreBy as IGuest).name}</div>,
    },
    {
      headRef: "Hành động",
      render: (goal) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            className="text-destructive"
            onClick={() => onRemoveGoal(goal?._id!)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ]

  async function onRemoveGoal(goalId: string) {
    toast.loading("Đang xóa bàn thắng...", {
      duration: Infinity,
    })
    const { success, message } = await removeGoal(matchId, goalId)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
  }

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    const filteredGoals = goals.filter((goal) => {
      const scoreBy = (goal.scoreBy as IGuest).name
      const team = (goal.team as ITeam).name
      return scoreBy.includes(value) || team.includes(value)
    })
    setGoals(filteredGoals)
  }

  function onChangeTeam(value: string) {
    const filteredGoals = goals.filter((goal) => (goal.team as ITeam)?._id! === value)
    setGoals(filteredGoals)
  }

  function onReset() {
    setGoals(goals)
  }

  async function onSubmit(data: FormSchema) {
    toast.loading("Đang tạo bàn thắng...", {
      duration: Infinity,
    })
    const { success, message } = await createGoal(matchId, data)
    toast.dismiss()
    if (!success) {
      toast.error(message)
      return
    }
    toast.success(message)
    setOpen(false)
    form.reset()
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Input className="flex-1" placeholder="Tìm kiếm bàn thắng..." onChange={onSearch} />
        <Select onValueChange={onChangeTeam}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Đội" />
          </SelectTrigger>
          <SelectContent className="w-fit">
            {teams.map((team) => (
              <SelectItem key={team.name} value={team?._id!}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant={"outline"} onClick={onReset}>
          Đặt lại
        </Button>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            <Button>Tạo bàn thắng</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Tạo bàn thắng</DialogTitle>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="scoreAtMinute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phút</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                          placeholder="Nhập vào phút ghi bàn thắng"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đội ghi bàn thắng</FormLabel>
                      <Select
                        onValueChange={(v) => {
                          field.onChange(v)
                          form.setValue("scoreBy", "")
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn đội ghi bàn thắng" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teams.map((team) => (
                            <SelectItem key={team.name} value={team?._id!}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues().team && (
                  <FormField
                    control={form.control}
                    name="scoreBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cầu thủ ghi bàn thắng</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn cầu thủ ghi bàn thắng" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {(
                              teams.find((t) => t._id === form.getValues().team)
                                ?.members as IGuest[]
                            )?.map((member) => (
                              <SelectItem key={member?._id!} value={member?._id!}>
                                {member.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <Button>Tạo</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table headers={headers} columns={columns} data={_goals} className="border shadow-sm" />
    </div>
  )
}

export default Goals
