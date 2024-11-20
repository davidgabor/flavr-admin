import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { FormSection } from "./FormSection";

interface Expert {
  id: string;
  name: string;
}

interface ExpertsSelectionProps {
  experts: Expert[];
  selectedExperts: string[];
  onExpertSelect: (expertId: string) => void;
}

export const ExpertsSelection = ({
  experts,
  selectedExperts,
  onExpertSelect,
}: ExpertsSelectionProps) => {
  const getExpertName = (expertId: string) => {
    return experts.find(e => e.id === expertId)?.name || 'Unknown Expert';
  };

  return (
    <FormSection title="Experts">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedExperts.map((expertId) => (
            <Badge 
              key={expertId}
              variant="secondary"
              className="bg-dashboard-card/50 text-white"
            >
              {getExpertName(expertId)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => onExpertSelect(expertId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <Select
          value=""
          onValueChange={onExpertSelect}
        >
          <SelectTrigger className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors">
            <SelectValue placeholder="Add an expert" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-card border-dashboard-accent/20">
            {experts
              .filter(expert => !selectedExperts.includes(expert.id))
              .map((expert) => (
                <SelectItem
                  key={expert.id}
                  value={expert.id}
                  className="text-white hover:bg-white/10"
                >
                  {expert.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </FormSection>
  );
};