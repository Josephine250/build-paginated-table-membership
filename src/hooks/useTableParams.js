// src/hooks/useTableParams.js
import { useCallback, useEffect, useState } from "react"

export const PAGE_SIZES = [10, 20, 50]
const DEFAULTS = { page: 1, pageSize: 10, sortBy: "", order: "asc", q: "", gender: "" }

function readParams() {
  const sp = new URLSearchParams(window.location.search)
  const size = parseInt(sp.get("pageSize"), 10)
  const gender = sp.get("gender")
  return {
    page: Math.max(1, parseInt(sp.get("page"), 10) || 1),
    pageSize: PAGE_SIZES.includes(size) ? size : DEFAULTS.pageSize,
    sortBy: sp.get("sortBy") || "",
    order: sp.get("order") === "desc" ? "desc" : "asc",
    q: sp.get("q") || "",
    gender: gender === "female" || gender === "male" ? gender : "",
  }
}

// All table state lives in the URL → shareable links, Back/Forward work.
export function useTableParams() {
  const [params, setParams] = useState(readParams)

  useEffect(() => {
    const onPop = () => setParams(readParams())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  const update = useCallback((patch) => {
    const next = { ...readParams(), ...patch }
    if (!("page" in patch)) next.page = 1 // any change except the page itself resets to page 1
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(next)) if (v !== DEFAULTS[k]) sp.set(k, v)
    const qs = sp.toString()
    window.history.pushState(null, "", qs ? `?${qs}` : window.location.pathname)
    setParams(next)
  }, [])

  return { params, update }
}