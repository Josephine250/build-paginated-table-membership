// src/features/users/queries.js
import { useEffect } from "react"
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchUsers } from "../../API/users"

export const userKeys = { list: (params) => ["users", "list", params] }
const STALE_MS = 30_000

export function useUsers(params) {
  const client = useQueryClient()

  const query = useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData, // no skeleton flash when changing pages
    staleTime: STALE_MS,
  })

  // prefetch the next page
  const totalPages = query.data ? Math.ceil(query.data.total / params.pageSize) : 0
  useEffect(() => {
    if (query.data && params.page < totalPages) {
      const next = { ...params, page: params.page + 1 }
      client.prefetchQuery({
        queryKey: userKeys.list(next),
        queryFn: () => fetchUsers(next),
        staleTime: STALE_MS,
      })
    }
  }, [query.data, params, totalPages, client])

  return query
}