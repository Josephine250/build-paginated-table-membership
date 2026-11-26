// src/features/users/TableToolbar.jsx
import { useEffect, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce"
import { PAGE_SIZES } from "../../hooks/useTableParams"

const inputCls = "rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"

export default function TableToolbar({ params, update, query }) {
  const { q, gender, pageSize } = params
  const [text, setText] = useState(q)
  const debounced = useDebounce(text, 400)

  useEffect(() => setText(q), [q]) // stay in sync with the URL (Back, Clear)

  useEffect(() => {
    const term = debounced.trim()
    if (term !== q) update({ q: term, gender: term ? "" : gender }) // one request after the pause
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced])

  const { data, isFetching } = query
  let summary = "Loading members…"
  if (data) {
    const from = data.total === 0 ? 0 : data.skip + 1
    const to = data.skip + data.users.length
    summary = q
      ? `Showing ${from}–${to} of ${data.total} results for '${q}'`
      : `Showing ${from}–${to} of ${data.total} members`
  }

  return (
    <div className="space-y-3 rounded-2xl border border-white bg-white/90 p-5 shadow-md ring-1 ring-stone-200">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1">
          <label htmlFor="search" className="mb-1 block text-sm font-medium">Search members</label>
          <div className="relative">
            <input
              id="search"
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Name, e.g. emily"
              className={`${inputCls} w-full pr-9 [&::-webkit-search-cancel-button]:hidden`}
            />
            {text && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => { setText(""); update({ q: "" }) }}
                className="absolute inset-y-0 right-0 rounded-r-lg px-3 text-stone-500 hover:text-stone-900"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="mb-1 block text-sm font-medium">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => { setText(""); update({ gender: e.target.value, q: "" }) }}
            className={inputCls}
          >
            <option value="">All</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div>
          <label htmlFor="pageSize" className="mb-1 block text-sm font-medium">Rows per page</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => update({ pageSize: Number(e.target.value) })}
            className={inputCls}
          >
            {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      <p className="text-xs text-stone-500">
        Search and the gender filter can't be combined: using one clears the other.
      </p>

      <div className="flex items-center gap-3">
        <p className="text-sm font-medium text-stone-700" aria-live="polite">{summary}</p>
        {isFetching && (
          <span role="status" className="animate-pulse rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            Updating…
          </span>
        )}
      </div>
    </div>
  )
}