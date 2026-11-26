// src/features/users/UsersTable.jsx
import SortableHeader from "./SortableHeader"
import ErrorState from "../../components/ErrorState"
import EmptyState from "../../components/EmptyState"

const COLUMNS = [
  { key: "name", label: "Name", sort: "firstName", skeleton: 130 },
  { key: "email", label: "Email", sort: "email", skeleton: 180 },
  { key: "phone", label: "Phone", skeleton: 110 },
  { key: "age", label: "Age", sort: "age", skeleton: 30 },
  { key: "gender", label: "Gender", sort: "gender", skeleton: 60 },
  { key: "company", label: "Company", skeleton: 120 },
  { key: "city", label: "City", skeleton: 90 },
]
const cellCls = "px-4 py-3 whitespace-nowrap"

export default function UsersTable({ params, update, query }) {
  const { data, isPending, isError, error, refetch, isFetching, isPlaceholderData } = query
  const { sortBy, order } = params

  const onSort = (field) =>
    update(sortBy === field ? { order: order === "asc" ? "desc" : "asc" } : { sortBy: field, order: "asc" })

  if (isError) return <ErrorState message={error.message} onRetry={refetch} retrying={isFetching} />
  if (data && data.users.length === 0) return <EmptyState onClear={() => update({ q: "", gender: "" })} />

  return (
    // Responsive choice: horizontal scroll + sticky name column (keeps all data and real table semantics)
    <div className="overflow-x-auto rounded-2xl border border-white bg-white shadow-md ring-1 ring-stone-200">
      <table className="min-w-full divide-y divide-stone-200 text-sm" aria-busy={isFetching}>
        <caption className="sr-only">Cooperative members. Column headings with buttons are sortable.</caption>
        <thead className="bg-emerald-50">
          <tr>
            {COLUMNS.map((c) =>
              c.sort ? (
                <SortableHeader key={c.key} label={c.label} field={c.sort} sortBy={sortBy} order={order} onSort={onSort} />
              ) : (
                <th key={c.key} scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-900">{c.label}</th>
              )
            )}
          </tr>
        </thead>
        <tbody className={`divide-y divide-stone-100 text-stone-700 transition-opacity ${isPlaceholderData ? "opacity-50" : ""}`}>
          {isPending
            ? Array.from({ length: Math.min(params.pageSize, 10) }).map((_, r) => (
                <tr key={r} aria-hidden="true">
                  {COLUMNS.map((c, i) => (
                    <td key={c.key} className={`${cellCls} ${i === 0 ? "sticky left-0 bg-white" : ""}`}>
                      <div className="h-4 animate-pulse rounded bg-stone-200" style={{ width: c.skeleton }} />
                    </td>
                  ))}
                </tr>
              ))
            : data.users.map((u) => (
                <tr key={u.id} className="group hover:bg-emerald-50">
                  <th scope="row" className={`${cellCls} sticky left-0 bg-white text-left font-medium text-stone-900 group-hover:bg-emerald-50`}>
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-bold text-white">
                        {u.firstName[0]}{u.lastName[0]}
                      </span>
                      {u.firstName} {u.lastName}
                    </div>
                  </th>
                  <td className={`${cellCls} text-emerald-800`}>{u.email}</td>
                  <td className={cellCls}>{u.phone}</td>
                  <td className={`${cellCls} tabular-nums`}>{u.age}</td>
                  <td className={cellCls}>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${u.gender === "female" ? "bg-rose-100 text-rose-800" : "bg-sky-100 text-sky-800"}`}>
                      {u.gender}
                    </span>
                  </td>
                  <td className={`${cellCls} font-medium`}>{u.company?.name}</td>
                  <td className={`${cellCls} text-stone-500`}>{u.address?.city}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}