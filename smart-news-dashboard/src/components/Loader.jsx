export default function Loader({ label = "Loading news" }) {
  return (
    <div className="page-shell">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={label}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="glass animate-pulse rounded-lg p-4">
            <div className="mb-4 aspect-[16/10] rounded-md bg-slate-200 dark:bg-slate-800" />
            <div className="mb-3 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="mb-2 h-5 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
