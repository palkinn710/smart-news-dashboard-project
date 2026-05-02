import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../utils/constants.js";
import { titleCase } from "../utils/formatters.js";

export default function CategoryTabs() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {CATEGORIES.map((category) => (
        <NavLink
          key={category}
          to={`/categories/${category}`}
          className={({ isActive }) =>
            `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-cyan-600 text-white"
                : "bg-white text-slate-700 hover:bg-cyan-50 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            }`
          }
        >
          {titleCase(category)}
        </NavLink>
      ))}
    </div>
  );
}
