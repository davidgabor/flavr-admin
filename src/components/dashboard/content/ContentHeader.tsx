import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentHeaderProps {
  onAddNew: () => void;
}

export const ContentHeader = ({ onAddNew }: ContentHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h1 className="text-3xl font-judson font-bold">Flavr Admin</h1>
      <Button 
        className="bg-dashboard-accent hover:bg-dashboard-accent/90"
        onClick={onAddNew}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </Button>
    </div>
  );
};