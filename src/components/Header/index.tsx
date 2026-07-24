import { Menu, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const user = {
    name: "Sakshi Tiwari",
    role: "Admin",
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className=" lg:hidden">
          <Menu />
        </button>

        <h1 className="text-xl font-bold text-primary">Lead CRM</h1>
      </div>
      <div className="border-b border-border md:p-5">
        <div className="flex items-center gap-3">
          {/* <button
            onClick={toggleTheme}
            className="
    h-10
    w-10
    rounded-full
    flex
    items-center
    justify-center
    border
    border-border
    bg-background
    hover:bg-accent
    transition-all
    duration-200
  "
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700" />
            )}
          </button> */}
          <div className="flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-primary text-white font-semibold">
            {user.name.charAt(0)}
          </div>

          <div className="hidden sm:block">
            <h3 className="text-sm font-semibold text-foreground">
              {user.name}
            </h3>

            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
