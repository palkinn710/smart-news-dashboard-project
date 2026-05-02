import { Bookmark, LayoutDashboard, Newspaper } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/categories/technology", label: "Categories", icon: Newspaper },
  { to: "/bookmarks", label: "Saved", icon: Bookmark },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/60 lg:block">
      <div className="sticky top-20 grid gap-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                  : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
