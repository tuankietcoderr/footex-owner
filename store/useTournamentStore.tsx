import ITournament from "@/interface/ITournament"
import {
  createTournament,
  deleteTournament,
  getBranchTournaments,
  updateTournament,
} from "@/services/tournament"
import { create } from "zustand"

interface ITournamentStore {
  tournaments: ITournament[] | undefined | null
  setTournaments: (tournaments: ITournament[]) => void
  tournament: ITournament | undefined | null
  setTournament: (tournament: ITournament) => void
  addTournament: (tournament: ITournament) => Promise<ITournament>
  updateTournament: (tournament_id: string, tournament: ITournament) => Promise<ITournament>
  getTournamentsOfBranch: (branchId: string) => Promise<ITournament[]>
  deleteTournament: (tournament_id: string) => Promise<ITournament>
  reset: (type: "all" | "single" | "multiple") => void
}

const useTournamentStore = create<ITournamentStore>((set, get) => ({
  tournament: undefined,
  setTournament: (tournament) => set({ tournament }),
  tournaments: undefined,
  setTournaments: (tournaments) => set({ tournaments }),
  addTournament: async (tournament) => {
    const res = await createTournament(tournament)
    if (res.success) {
      set({ tournament: res.data, tournaments: [res.data, ...(get().tournaments || [])] })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  updateTournament: async (tournament_id, tournament) => {
    const res = await updateTournament(tournament_id, tournament)
    if (res.success) {
      const tournaments = get().tournaments?.map((f) => {
        if (f._id === tournament._id) {
          return res.data
        } else {
          return f
        }
      })
      set({ tournament: res.data, tournaments })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  getTournamentsOfBranch: async (orgId) => {
    set({ tournaments: undefined })
    const res = await getBranchTournaments(orgId)
    if (res.success) {
      set({ tournaments: res.data.reverse() })
      return res.data
    } else {
      set({ tournaments: null })
      return Promise.reject(res.message)
    }
  },
  deleteTournament: async (tournament_id) => {
    const res = await deleteTournament(tournament_id)
    if (res.success) {
      const tournaments = get().tournaments?.filter((f) => f._id !== tournament_id)
      set({ tournaments })
      return res.data
    } else {
      return Promise.reject(res.message)
    }
  },
  reset: (type) => {
    if (type === "all") {
      set({ tournament: undefined, tournaments: undefined })
    } else if (type === "single") {
      set({ tournament: undefined })
    } else {
      set({ tournaments: undefined })
    }
  },
}))

export default useTournamentStore
