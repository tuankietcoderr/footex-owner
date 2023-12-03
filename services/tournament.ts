import apiInstance from "@/api/instance"
import API_ROUTE from "@/constants/api-route"
import ITournament from "@/interface/ITournament"

const createTournament = async (data: ITournament) => {
  try {
    const res = await apiInstance.post(API_ROUTE.TOURNAMENT.INDEX, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const updateTournament = async (tournament_id: string, data: ITournament) => {
  try {
    const res = await apiInstance.put(API_ROUTE.TOURNAMENT.ID.replace(":id", tournament_id), data)
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const getBranchTournaments = async (branch_id: string) => {
  try {
    const res = await apiInstance.get(API_ROUTE.TOURNAMENT.BRANCH.replace(":id", branch_id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

const deleteTournament = async (tournament_id: string) => {
  try {
    const res = await apiInstance.delete(API_ROUTE.TOURNAMENT.ID.replace(":id", tournament_id))
    return res.data
  } catch (error: any) {
    return error?.response?.data ?? error.message
  }
}

export { createTournament, updateTournament, getBranchTournaments, deleteTournament }
