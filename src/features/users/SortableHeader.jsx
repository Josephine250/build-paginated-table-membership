// src/features/users/SortableHeader.jsx

export default function SortableHeader({ label, field, sortBy, order, onSort }) {
  const active = sortBy === field
  const ariaSort = active ? (order === "asc" ? "ascending" : "descending") : "none"
  return (
    <th scope="col" aria-sort={ariaSort} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-emerald-900">
      <button
        type="button"
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1.5 rounded hover:text-emerald-800"
      >
        {label}
        <span aria-hidden="true" className={active ? "text-emerald-700" : "text-stone-400"}>
          {active ? (order === "asc" ? "▲" : "▼") : "↕"}
        </span>
      </button>
    </th>
  )
}