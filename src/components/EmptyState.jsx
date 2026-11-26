// src/components/EmptyState.jsx

export default function EmptyState({ onClear }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center">
      <h2 className="text-lg font-semibold">No members match</h2>
      <p className="mt-1 text-sm text-stone-600">Try a different name, or remove the current search and filters.</p>
      <button onClick={onClear} className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white">
        Clear search and filters
      </button>
    </div>
  )
}