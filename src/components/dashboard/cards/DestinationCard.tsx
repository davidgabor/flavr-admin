import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditDestinationDialog } from "../EditDestinationDialog";
import { Trash2 } from "lucide-react";

interface DestinationCardProps {
  destination: any;
  onDelete: (id: string) => void;
}

export const DestinationCard = ({ destination, onDelete }: DestinationCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-dashboard-card border-white/5 hover:border-dashboard-accent/50 transition-all duration-300">
      {destination.image && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between font-judson">
          <span className="line-clamp-1">{destination.name}</span>
          <div className="flex gap-2">
            <EditDestinationDialog destination={destination} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(destination.id)}
              className="hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="text-dashboard-muted">
          {destination.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <p className="line-clamp-2 text-sm text-dashboard-muted">
          {destination.description}
        </p>
      </CardContent>
    </Card>
  );
};