// src/api/users.js
import { api } from "./client"

const FIELDS = "firstName,lastName,email,phone,age,gender,company,address"

// One function for list, search and filter (DummyJSON uses a different endpoint for each).
// The API can't combine search and filter, so search wins if both are set.
export function fetchUsers({ page, pageSize, sortBy, order, q, gender }) {
  const base = {
    limit: pageSize,
    skip: (page - 1) * pageSize,
    select: FIELDS,
    ...(sortBy ? { sortBy, order } : {}),
  }
  if (q) return api("/users/search", { ...base, q })
  if (gender) return api("/users/filter", { ...base, key: "gender", value: gender })
  return api("/users", base)
}