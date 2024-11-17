import { useState } from "react";
import { useData } from "@/contexts/DataContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

export const EditRecommendationDialog = ({
  recommendation,
}: {
  recommendation: any;
}) => {
  const { updateRecommendation } = useData();
  const [formData, setFormData] = useState(recommendation);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRecommendation(recommendation.id, formData);
      toast.success("Recommendation updated successfully");
    } catch (error) {
      toast.error("Failed to update recommendation");
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel max-w-2xl border-dashboard-accent/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Recommendation</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <BasicInfoFields formData={formData} onChange={handleFieldChange} />
            
            <FormSection title="Description">
              <Textarea
                value={formData.description || ""}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
              />
            </FormSection>

            <div className="grid grid-cols-2 gap-4">
              <FormSection title="Rating">
                <Input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleFieldChange("rating", parseFloat(e.target.value))}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </FormSection>
              <FormSection title="Neighborhood">
                <Input
                  value={formData.neighborhood || ""}
                  onChange={(e) => handleFieldChange("neighborhood", e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
              </FormSection>
            </div>

            <FormSection title="Contact Information">
              <div className="space-y-4">
                <Input
                  placeholder="Address"
                  value={formData.address || ""}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Phone"
                  value={formData.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Website"
                  value={formData.website || ""}
                  onChange={(e) => handleFieldChange("website", e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
                />
                <Input
                  placeholder="Instagram"
                  value={formData.instagram || ""}
                  onChange={(e) => handleFieldChange("instagram", e.target.value)}
                  className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
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
                className="min-h-[100px] bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
              />
            </FormSection>

            <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
              Update Recommendation
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};