// src/App.jsx
import { useTableParams } from "./hooks/useTableParams"
import { useUsers } from "./features/users/Queries"
import TableToolbar from "./features/users/TableToolbar"
import UsersTable from "./features/users/UsersTable"
import TablePagination from "./features/users/TablePagination"

export default function App() {
  const { params, update } = useTableParams()
  const query = useUsers(params)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-600 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Kigali cooperative</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Abanyamuryango</h1>
            <p className="mt-1 text-emerald-100">Members directory</p>
          </div>
          {query.data && (
            <div className="rounded-xl bg-white/15 px-5 py-3 text-center ring-1 ring-white/25 backdrop-blur">
              <p className="text-3xl font-bold leading-none">{query.data.total}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-emerald-100">{params.q || params.gender ? "matches" : "members"}</p>
            </div>
          )}
        </div>
      </header>
      <div className="space-y-4">
        <TableToolbar params={params} update={update} query={query} />
        <UsersTable params={params} update={update} query={query} />
        <TablePagination params={params} update={update} total={query.data?.total ?? 0} />
      </div>
    </main>
  )
}