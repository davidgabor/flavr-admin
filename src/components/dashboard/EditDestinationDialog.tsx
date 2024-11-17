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
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface DestinationFormData {
  name: string;
  country: string;
  description: string;
  image: string;
  region: string;
  name_search?: any;
}

interface EditDestinationDialogProps {
  destination: any;
  isNew?: boolean;
  onClose?: () => void;
}

export const EditDestinationDialog = ({ destination, isNew, onClose }: EditDestinationDialogProps) => {
  const { updateDestination, refreshData } = useData();
  const [open, setOpen] = useState(isNew);
  const [formData, setFormData] = useState<DestinationFormData>({
    name: destination.name,
    country: destination.country,
    description: destination.description,
    image: destination.image,
    region: destination.region,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { name_search, ...updateData } = formData;
      
      if (isNew) {
        const { error } = await supabase
          .from("destinations")
          .insert({ id: destination.id, ...updateData });
        
        if (error) throw error;
        toast.success("Destination created successfully");
      } else {
        await updateDestination(destination.id, updateData);
        toast.success("Destination updated successfully");
      }
      
      refreshData();
      handleClose();
    } catch (error) {
      toast.error(isNew ? "Failed to create destination" : "Failed to update destination");
    }
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
            {isNew ? "Create Destination" : "Edit Destination"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Name</Label>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Country</Label>
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Region</Label>
            <Input
              placeholder="Region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Image URL</Label>
            <Input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Description</Label>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 min-h-[100px] transition-colors"
            />
          </div>
          <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
            {isNew ? "Create Destination" : "Update Destination"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};