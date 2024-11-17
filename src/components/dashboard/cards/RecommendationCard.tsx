import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditRecommendationDialog } from "../EditRecommendationDialog";
import { Trash2, Star } from "lucide-react";

interface RecommendationCardProps {
  recommendation: any;
  onDelete: (id: string) => void;
}

export const RecommendationCard = ({ recommendation, onDelete }: RecommendationCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-dashboard-card text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
      {recommendation.image && (
        <div className="absolute inset-0 -z-10">
          <img
            src={recommendation.image}
            alt={recommendation.name}
            className="h-full w-full object-cover opacity-30"
          />
        </div>
      )}
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <span className="line-clamp-1">{recommendation.name}</span>
          <div className="flex gap-2 z-10">
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
        <CardDescription className="flex items-center gap-2 text-dashboard-muted">
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
        <p className="line-clamp-2 text-sm text-dashboard-muted">
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