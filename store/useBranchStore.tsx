import { create } from "zustand"
import IBranch, { EBranchStatus } from "@/interface/IBranch"
import {
  createBranch,
  deleteBranch,
  getAllBranchs,
  getBranchById,
  updateBranch,
  updateBranchStatus,
} from "@/services/branch"

interface BranchStore {
  branches: IBranch[] | null | undefined
  branch: IBranch | null | undefined
  setBranch: (branch: IBranch) => void
  setBranches: (branches: IBranch[]) => void
  loadBranches: () => Promise<IBranch[]>
  loadBranch: (id: string) => Promise<void>
  addBranch: (branch: IBranch) => Promise<IBranch>
  updateBranch: (id: string, branch: IBranch) => Promise<void>
  deleteBranch: (id: string) => Promise<void>
  updateBranchStatus: (id: string, status: EBranchStatus) => Promise<void>
  reset: (type: "all" | "single" | "multiple") => void
}

const useBranchStore = create<BranchStore>((set, get) => ({
  branches: undefined,
  branch: undefined,
  setBranches: (branches) => set({ branches }),
  loadBranches: async () => {
    const res = await getAllBranchs()
    if (res.success) {
      set({ branches: res.data })
      return res.data
    } else {
      set({ branches: null })
      throw res.message
    }
  },
  loadBranch: async (id) => {
    const res = await getBranchById(id)
    if (res.success) {
      set({ branch: res.data })
    } else {
      set({ branch: null })
      throw res.message
    }
  },
  setBranch: (branch) => set({ branch }),
  addBranch: async (branch) => {
    const res = await createBranch(branch)
    if (res.success) {
      set({
        branches: [...(get().branches || []), res.data],
        branch: res.data,
      })
      return res.data
    } else {
      throw res.message
    }
  },
  updateBranch: async (id, branch) => {
    const branches = get().branches || []
    const index = branches.findIndex((item) => item._id === branch._id)
    if (index === -1) {
      Promise.reject("Không tìm thấy sân bóng")
    }
    const res = await updateBranch(id, branch)
    if (res.success) {
      branches[index] = res.data
      set({ branches })
    } else {
      throw res.message
    }
  },
  deleteBranch: async (id) => {
    const branches = get().branches || []
    const res = await deleteBranch(id)
    if (res.success) {
      set({ branches: branches.filter((item) => item._id !== id) })
    } else {
      throw res.message
    }
  },
  updateBranchStatus: async (id, status) => {
    const branches = get().branches || []
    const index = branches.findIndex((item) => item._id === id)
    if (index === -1) {
      throw "Không tìm thấy sân bóng"
    }
    const res = await updateBranchStatus(id, status)
    if (res.success) {
      branches[index] = res.data
      set({ branches })
    } else {
      throw res.message
    }
  },
  reset: (type) => {
    switch (type) {
      case "all":
        set({ branches: undefined, branch: undefined })
        break
      case "single":
        set({ branch: undefined })
        break
      case "multiple":
        set({ branches: undefined })
        break
      default:
        break
    }
  },
}))

export default useBranchStore
