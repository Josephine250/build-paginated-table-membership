// src/components/ErrorState.jsx

export default function ErrorState({ message, onRetry, retrying }) {
  return (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
      <h2 className="text-lg font-semibold text-red-900">Couldn't load members</h2>
      <p className="mt-1 text-sm text-red-800">{message}</p>
      <button
        onClick={() => onRetry()}
        disabled={retrying}
        className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {retrying ? "Retrying…" : "Try again"}
      </button>
    </div>
  )
}