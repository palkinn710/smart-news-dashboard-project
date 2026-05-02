import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, suggestions = [], onSuggestionClick }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Search size={18} className="text-slate-500" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search headlines, sources, topics..."
          className="w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400 dark:text-white"
        />
      </div>
      {value && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          {suggestions.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSuggestionClick(item.title)}
              className="block w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-cyan-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
