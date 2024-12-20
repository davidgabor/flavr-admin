import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Header = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b border-white/5 bg-dashboard-card backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-judson tracking-wide text-white/90">
            Admin Dashboard
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-white/70 hover:text-white hover:bg-white/5 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;