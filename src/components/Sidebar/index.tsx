import { useLocation } from "wouter";
import { menus } from "../../utils/constant";

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-40 border-r border-border bg-card">
      <nav className="space-y-1 p-2">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              onClick={() => setLocation(item.path)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition
                ${
                  location === item.path
                    ? "bg-primary text-white"
                    : "hover:bg-accent hover:text-primary"
                } !rounded-[4px]`}
            >
              {<Icon size={18} />}
              {item.name}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
