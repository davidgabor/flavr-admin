import { Search } from "lucide-react";
import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { destinations, recommendations } = useData();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (value === "destination") {
      setOpen(false);
      navigate("/destinations");
    } else if (value === "recommendation") {
      setOpen(false);
      navigate("/recommendations");
    }
  };

  return (
    <header className="glass-panel flex h-16 items-center px-6">
      <div className="relative flex w-96 items-center">
        <Search className="absolute left-3 h-4 w-4 text-dashboard-muted" />
        <input
          type="text"
          placeholder="Search content..."
          className="h-10 w-full rounded-lg bg-white/5 pl-10 pr-4 text-sm text-white placeholder-dashboard-muted outline-none focus:ring-1 focus:ring-dashboard-accent"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Destinations">
            {destinations.map((destination) => (
              <CommandItem
                key={destination.id}
                value={`destination-${destination.id}`}
                onSelect={() => {
                  setOpen(false);
                  navigate(`/destinations/${destination.id}`);
                }}
              >
                {destination.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Recommendations">
            {recommendations.map((recommendation) => (
              <CommandItem
                key={recommendation.id}
                value={`recommendation-${recommendation.id}`}
                onSelect={() => {
                  setOpen(false);
                  navigate(`/recommendations/${recommendation.id}`);
                }}
              >
                {recommendation.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;