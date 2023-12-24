export interface FetchResponse<T extends any> {
  data?: T
  message: string
  success: boolean
  code: number
  accessToken?: string
}
