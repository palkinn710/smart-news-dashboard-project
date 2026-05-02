import { CATEGORIES } from "../utils/constants.js";
import { titleCase } from "../utils/formatters.js";

export default function FilterPanel({ filters, onChange, sources = [] }) {
  return (
    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
      <label className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Sort
        <select
          value={filters.sortBy}
          onChange={(event) => onChange({ sortBy: event.target.value })}
          className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="newest">Newest</option>
          <option value="popularity">Popularity</option>
        </select>
      </label>
      <label className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Source
        <select
          value={filters.source}
          onChange={(event) => onChange({ source: event.target.value })}
          className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="">All sources</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
        Category
        <select
          value={filters.category}
          onChange={(event) => onChange({ category: event.target.value })}
          className="focus-ring w-full rounded-md border border-slate-200 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
        >
          <option value="general">General</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {titleCase(category)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
