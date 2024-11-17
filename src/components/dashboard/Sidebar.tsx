import { Home, Settings, Files, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Files, label: "Content", href: "/content" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "glass-panel fixed left-0 top-0 h-screen transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && <span className="text-lg font-semibold">Dashboard</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 hover:bg-white/5"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-8 px-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="mb-2 flex items-center rounded-lg px-4 py-3 text-dashboard-muted transition-colors hover:bg-white/5 hover:text-white"
          >
            <item.icon size={20} />
            {!collapsed && <span className="ml-4">{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;