// src/features/users/TablePagination.jsx

function getPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push("…")
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push("…")
  pages.push(total)
  return pages
}

const pageBtn = "min-w-10 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"

export default function TablePagination({ params, update, total }) {
  const totalPages = Math.ceil(total / params.pageSize)
  if (totalPages <= 1) return null
  const { page } = params
  const go = (p) => update({ page: p })

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1.5">
      <button className={`${pageBtn} border-stone-300 bg-white`} disabled={page <= 1} onClick={() => go(page - 1)}>
        Previous
      </button>
      {getPages(page, totalPages).map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-stone-500">…</span>
        ) : (
          <button
            key={p}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={`${pageBtn} ${p === page ? "border-emerald-700 bg-emerald-700 text-white shadow-md" : "border-stone-300 bg-white"}`}
          >
            {p}
          </button>
        )
      )}
      <button className={`${pageBtn} border-stone-300 bg-white`} disabled={page >= totalPages} onClick={() => go(page + 1)}>
        Next
      </button>
    </nav>
  )
}