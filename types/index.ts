export type TPagination = {
  page: number
  limit: number
  totalPages?: number
  totalDocs?: number
  pagingCounter?: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
  prevPage?: number
  nextPage?: number
}
