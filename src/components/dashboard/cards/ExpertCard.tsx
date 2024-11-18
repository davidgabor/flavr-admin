import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";
import { EditExpertDialog } from "../EditExpertDialog";

interface ExpertCardProps {
  expert: {
    id: string;
    name: string;
    bio?: string;
    image?: string;
  };
  onDelete: (id: string) => void;
}

export const ExpertCard = ({ expert, onDelete }: ExpertCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-dashboard-card border-white/5 hover:border-dashboard-accent/50 transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4">
          {expert.image && (
            <img
              src={expert.image}
              alt={expert.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-white">{expert.name}</h3>
            {expert.bio && (
              <p className="mt-1 text-sm text-dashboard-muted">{expert.bio}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <EditExpertDialog expert={expert} />
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-white/10 text-white"
          onClick={() => onDelete(expert.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};