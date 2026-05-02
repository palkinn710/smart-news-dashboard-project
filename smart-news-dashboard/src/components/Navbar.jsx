import { Menu, Newspaper, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/categories/technology", label: "Categories" },
  { to: "/bookmarks", label: "Bookmarks" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 font-black text-slate-950 dark:text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white shadow-lg shadow-cyan-500/20 dark:bg-white dark:text-slate-950">
            <Newspaper size={20} />
          </span>
          <span>
            <span className="block leading-tight">Smart News</span>
            <span className="block text-xs font-semibold text-cyan-700 dark:text-cyan-300">Daily media desk</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
        </div>
        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 p-4 dark:border-slate-800 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 font-semibold text-slate-700 dark:text-slate-200">
                {link.label}
              </NavLink>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
