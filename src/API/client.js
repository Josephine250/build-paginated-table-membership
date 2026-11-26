// src/api/client.js

const BASE_URL = "https://dummyjson.com"

export async function api(path, params) {
  const url = new URL(BASE_URL + path)
  for (const [k, v] of Object.entries(params)) {
    if (v !== "" && v != null) url.searchParams.set(k, v)
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`The server responded with status ${res.status}.`)
  return res.json()
}