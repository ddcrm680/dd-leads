import { useLocation } from "wouter";
import { LogOut } from "lucide-react";
import { menus } from "../../utils/constant";

interface Props {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: Props) {
  const [location, navigate] = useLocation();

  const user = {
    name: "Sakshi Tiwari",
    role: "Admin",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      {/* Profile */}
      <div className="border-b lg:hidden border-border p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white font-semibold">
            {user.name.charAt(0)}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {user.name}
            </h3>

            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                onClose?.();
              }}
              className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm transition
                ${
                  location === item.path
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                }`}
            >
              <Icon size={18} />
              {item.name}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-2">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
