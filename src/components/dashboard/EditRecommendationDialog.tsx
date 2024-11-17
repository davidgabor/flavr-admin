import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoFields } from "./recommendation-form/BasicInfoFields";
import { ImageInput } from "./recommendation-form/ImageInput";
import { FormSection } from "./recommendation-form/FormSection";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditRecommendationDialogProps {
  recommendation: any;
  isNew?: boolean;
  onClose?: () => void;
}

export const EditRecommendationDialog = ({
  recommendation,
  isNew,
  onClose,
}: EditRecommendationDialogProps) => {
  const { updateRecommendation, destinations, refreshData } = useData();
  const [open, setOpen] = useState(isNew);
  const [formData, setFormData] = useState(recommendation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { name_search, ...updateData } = formData;

      if (isNew) {
        const { error } = await supabase
          .from("recommendations")
          .insert({ id: recommendation.id, ...updateData });
        
        if (error) throw error;
        toast.success("Recommendation created successfully");
      } else {
        await updateRecommendation(recommendation.id, updateData);
        toast.success("Recommendation updated successfully");
      }
      
      refreshData();
      handleClose();
    } catch (error) {
      toast.error(isNew ? "Failed to create recommendation" : "Failed to update recommendation");
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isNew && (
        <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100" onClick={() => setOpen(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <DialogContent className="bg-dashboard-background border-dashboard-accent/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isNew ? "Create Recommendation" : "Edit Recommendation"}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Destination">
              <Select
                value={formData.destination_id}
                onValueChange={(value) => handleFieldChange("destination_id", value)}
              >
                <SelectTrigger className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors">
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent className="bg-dashboard-card border-dashboard-accent/20">
                  {destinations.map((destination) => (
                    <SelectItem
                      key={destination.id}
                      value={destination.id}
                      className="text-white hover:bg-white/10"
                    >
                      {destination.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormSection>

            <BasicInfoFields formData={formData} onChange={handleFieldChange} />
            
            <FormSection title="Description">
              <Textarea
                value={formData.description || ""}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
              />
            </FormSection>

            <div className="grid grid-cols-2 gap-4">
              <FormSection title="Rating">
                <Input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleFieldChange("rating", parseFloat(e.target.value))}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </FormSection>
              <FormSection title="Neighborhood">
                <Input
                  value={formData.neighborhood || ""}
                  onChange={(e) => handleFieldChange("neighborhood", e.target.value)}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </FormSection>
            </div>

            <FormSection title="Contact Information">
              <div className="space-y-4">
                <Input
                  placeholder="Address"
                  value={formData.address || ""}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Website"
                  value={formData.website || ""}
                  onChange={(e) => handleFieldChange("website", e.target.value)}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Instagram"
                  value={formData.instagram || ""}
                  onChange={(e) => handleFieldChange("instagram", e.target.value)}
                  className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </div>
            </FormSection>

            <ImageInput
              mainImage={formData.image}
              additionalImages={formData.images || []}
              onMainImageChange={(value) => handleFieldChange("image", value)}
              onAdditionalImagesChange={(value) => handleFieldChange("images", value)}
            />

            <FormSection title="Our Review">
              <Textarea
                value={formData.our_review || ""}
                onChange={(e) => handleFieldChange("our_review", e.target.value)}
                className="min-h-[100px] bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
              />
            </FormSection>

            <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
              {isNew ? "Create Recommendation" : "Update Recommendation"}
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};