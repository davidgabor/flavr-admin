import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditRecommendationDialog } from "../EditRecommendationDialog";
import { Trash2, Star, MapPin } from "lucide-react";
import { useData } from "@/contexts/DataContext";

interface RecommendationCardProps {
  recommendation: any;
  onDelete: (id: string) => void;
}

export const RecommendationCard = ({ recommendation, onDelete }: RecommendationCardProps) => {
  const { destinations } = useData();
  const destination = destinations.find(d => d.id === recommendation.destination_id);

  return (
    <Card className="group relative overflow-hidden bg-dashboard-card border-white/5 hover:border-dashboard-accent/50 transition-all duration-300">
      {recommendation.image && (
        <div className="h-32 w-full overflow-hidden">
          <img
            src={recommendation.image}
            alt={recommendation.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader className="relative">
        <div className="flex items-start gap-2 mb-2 text-dashboard-muted">
          <MapPin className="h-4 w-4 mt-0.5" />
          <span className="text-sm text-left">
            {destination?.name}, {destination?.country} ({destination?.region})
          </span>
        </div>
        <CardTitle className="flex items-start justify-between font-judson text-white">
          <span className="line-clamp-1 text-left">{recommendation.name}</span>
          <div className="flex gap-2">
            <EditRecommendationDialog recommendation={recommendation} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(recommendation.id)}
              className="hover:bg-red-500/20"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription className="flex items-start gap-2 text-dashboard-muted">
          <span>{recommendation.type}</span>
          <span>•</span>
          <span>{recommendation.price_level}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{recommendation.rating}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative space-y-2">
        <p className="line-clamp-2 text-sm text-dashboard-muted text-left">
          {recommendation.description}
        </p>
        {recommendation.cuisine && (
          <div className="inline-block rounded-full bg-dashboard-accent/20 px-2 py-1 text-xs text-dashboard-accent">
            {recommendation.cuisine}
          </div>
        )}
      </CardContent>
    </Card>
  );
};