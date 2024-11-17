import { Bell, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="glass-panel flex h-16 items-center justify-between px-6">
      <div className="relative flex w-96 items-center">
        <Search className="absolute left-3 h-4 w-4 text-dashboard-muted" />
        <input
          type="text"
          placeholder="Search content..."
          className="h-10 w-full rounded-lg bg-white/5 pl-10 pr-4 text-sm text-white placeholder-dashboard-muted outline-none focus:ring-1 focus:ring-dashboard-accent"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-white/5">
          <Bell size={20} />
        </button>
        <div className="h-8 w-8 rounded-full bg-dashboard-accent" />
      </div>
    </header>
  );
};

export default Header;