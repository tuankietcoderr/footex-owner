import IPrize from "@/interface/IPrize"
import { createPrize, getBranchPrizes, updatePrize } from "@/services/prize"
import { create } from "zustand"

interface IPrizeStore {
  prizes: IPrize[] | undefined | null
  setPrizes: (prizes: IPrize[]) => void
  prize: IPrize | undefined | null
  setPrize: (prize: IPrize) => void
  addPrize: (prize: IPrize) => Promise<IPrize>
  updatePrize: (prize_id: string, prize: IPrize) => Promise<IPrize>
  getPrizesOfBranch: (branchId: string) => Promise<IPrize[]>
  reset: (type: "all" | "single" | "multiple") => void
}

const usePrizeStore = create<IPrizeStore>((set, get) => ({
  prize: undefined,
  setPrize: (prize) => set({ prize }),
  prizes: undefined,
  setPrizes: (prizes) => set({ prizes }),
  addPrize: async (prize) => {
    const res = await createPrize(prize)
    if (res.success) {
      set({ prize: res.data, prizes: [res.data, ...(get().prizes || [])] })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  updatePrize: async (prize_id, prize) => {
    const res = await updatePrize(prize_id, prize)
    if (res.success) {
      const prizes = get().prizes?.map((f) => {
        if (f._id === prize._id) {
          return res.data
        } else {
          return f
        }
      })
      set({ prize: res.data, prizes })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  getPrizesOfBranch: async (orgId) => {
    set({ prizes: undefined })
    const res = await getBranchPrizes(orgId)
    if (res.success) {
      set({ prizes: res.data.reverse() })
      return res.data
    } else {
      set({ prizes: null })
      return Promise.reject(res.message)
    }
  },
  reset: (type) => {
    if (type === "all") {
      set({ prize: undefined, prizes: undefined })
    } else if (type === "single") {
      set({ prize: undefined })
    } else {
      set({ prizes: undefined })
    }
  },
}))

export default usePrizeStore
