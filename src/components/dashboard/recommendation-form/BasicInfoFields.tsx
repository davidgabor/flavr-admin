import { Input } from "@/components/ui/input";
import { FormSection } from "./FormSection";

interface BasicInfoFieldsProps {
  formData: any;
  onChange: (field: string, value: any) => void;
}

export const BasicInfoFields = ({ formData, onChange }: BasicInfoFieldsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormSection title="Name">
        <Input
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
        />
      </FormSection>
      <FormSection title="Type">
        <Input
          value={formData.type}
          onChange={(e) => onChange("type", e.target.value)}
          className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
        />
      </FormSection>
      <FormSection title="Cuisine">
        <Input
          value={formData.cuisine}
          onChange={(e) => onChange("cuisine", e.target.value)}
          className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
        />
      </FormSection>
      <FormSection title="Price Level">
        <Input
          value={formData.price_level}
          onChange={(e) => onChange("price_level", e.target.value)}
          className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
        />
      </FormSection>
    </div>
  );
};