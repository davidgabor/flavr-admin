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

interface Person {
  id: string;
  name: string;
}

interface PeopleSelectionProps {
  people: Person[];
  selectedPeople: string[];
  onPersonSelect: (personId: string) => void;
}

export const PeopleSelection = ({
  people,
  selectedPeople,
  onPersonSelect,
}: PeopleSelectionProps) => {
  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || 'Unknown Person';
  };

  return (
    <FormSection title="People">
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedPeople.map((personId) => (
            <Badge 
              key={personId}
              variant="secondary"
              className="bg-dashboard-card/50 text-white"
            >
              {getPersonName(personId)}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => onPersonSelect(personId)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <Select
          value=""
          onValueChange={onPersonSelect}
        >
          <SelectTrigger className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors">
            <SelectValue placeholder="Add a person" />
          </SelectTrigger>
          <SelectContent className="bg-dashboard-card border-dashboard-accent/20">
            {people
              .filter(person => !selectedPeople.includes(person.id))
              .map((person) => (
                <SelectItem
                  key={person.id}
                  value={person.id}
                  className="text-white hover:bg-white/10"
                >
                  {person.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </FormSection>
  );
};