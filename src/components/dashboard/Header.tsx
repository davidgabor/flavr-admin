import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="glass-panel flex h-16 items-center px-6">
      <div className="relative flex w-96 items-center">
        <Search className="absolute left-3 h-4 w-4 text-dashboard-muted" />
        <input
          type="text"
          placeholder="Search content..."
          className="h-10 w-full rounded-lg bg-white/5 pl-10 pr-4 text-sm text-white placeholder-dashboard-muted outline-none focus:ring-1 focus:ring-dashboard-accent"
        />
      </div>
    </header>
  );
};

export default Header;