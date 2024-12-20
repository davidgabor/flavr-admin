import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditRecommendationDialog } from "../EditRecommendationDialog";
import { Trash2, Star, MapPin, ExternalLink, Phone, Instagram } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface RecommendationCardProps {
  recommendation: any;
  onDelete: (id: string) => void;
}

export const RecommendationCard = ({ recommendation, onDelete }: RecommendationCardProps) => {
  const { destinations } = useData();
  const destination = destinations.find(d => d.id === recommendation.destination_id);

  const renderQuickAction = (icon: React.ReactNode, label: string, onClick: () => void) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card className="group relative bg-dashboard-card border-white/5 hover:border-dashboard-accent/50 transition-all duration-300">
      <div className="absolute right-2 top-2 flex gap-1 z-10">
        {recommendation.website && renderQuickAction(
          <ExternalLink className="h-4 w-4" />,
          "Visit Website",
          () => window.open(recommendation.website, '_blank')
        )}
        {recommendation.phone && renderQuickAction(
          <Phone className="h-4 w-4" />,
          "Call",
          () => window.open(`tel:${recommendation.phone}`, '_blank')
        )}
        {recommendation.instagram && renderQuickAction(
          <Instagram className="h-4 w-4" />,
          "View Instagram",
          () => window.open(`https://instagram.com/${recommendation.instagram}`, '_blank')
        )}
        <EditRecommendationDialog recommendation={recommendation} />
        {renderQuickAction(
          <Trash2 className="h-4 w-4 text-red-500" />,
          "Delete",
          () => onDelete(recommendation.id)
        )}
      </div>

      <div className="flex">
        {recommendation.image && (
          <div className="w-32 h-32">
            <img
              src={recommendation.image}
              alt={recommendation.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="h-3 w-3 text-dashboard-muted" />
              <span className="text-xs text-dashboard-muted truncate">
                {destination?.name}, {destination?.country}
              </span>
            </div>
            <CardTitle className="text-lg font-judson text-white truncate">
              {recommendation.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-dashboard-muted">
              <Badge variant="outline" className="text-xs">
                {recommendation.type}
              </Badge>
              <span>•</span>
              <Badge variant="outline" className="text-xs">
                {recommendation.price_level}
              </Badge>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span className="text-sm">{recommendation.rating}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {recommendation.description && (
              <p className="line-clamp-2 text-sm text-dashboard-muted mb-2">
                {recommendation.description}
              </p>
            )}
            <div className="flex flex-wrap gap-1">
              {recommendation.cuisine && (
                <Badge className="bg-dashboard-accent/20 text-dashboard-accent hover:bg-dashboard-accent/30">
                  {recommendation.cuisine}
                </Badge>
              )}
              {recommendation.neighborhood && (
                <Badge variant="secondary" className="bg-white/5 hover:bg-white/10">
                  {recommendation.neighborhood}
                </Badge>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};