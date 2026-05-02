import { RotateCcw } from "lucide-react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="glass rounded-lg p-6 text-center">
      <h2 className="text-xl font-bold text-slate-950 dark:text-white">Something went wrong</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
        >
          <RotateCcw size={16} />
          Retry
        </button>
      )}
    </div>
  );
}
