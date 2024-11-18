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

interface ExpertFormData {
  name: string;
  bio?: string;
  image?: string;
}

interface EditExpertDialogProps {
  expert?: any;
  isNew?: boolean;
  onClose?: () => void;
}

export const EditExpertDialog = ({ expert, isNew, onClose }: EditExpertDialogProps) => {
  const { refreshData } = useData();
  const [open, setOpen] = useState(isNew);
  const [formData, setFormData] = useState<ExpertFormData>({
    name: expert?.name || "",
    bio: expert?.bio || "",
    image: expert?.image || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        const { error } = await supabase
          .from("experts")
          .insert({ id: crypto.randomUUID(), ...formData });
        
        if (error) throw error;
        toast.success("Expert created successfully");
      } else {
        const { error } = await supabase
          .from("experts")
          .update(formData)
          .eq("id", expert.id);
        
        if (error) throw error;
        toast.success("Expert updated successfully");
      }
      
      refreshData();
      handleClose();
    } catch (error) {
      toast.error(isNew ? "Failed to create expert" : "Failed to update expert");
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isNew && (
        <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100 text-white hover:bg-white/10" onClick={() => setOpen(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      )}
      <DialogContent className="bg-dashboard-background border-dashboard-accent/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isNew ? "Create Expert" : "Edit Expert"}
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
            <Label className="text-sm font-medium text-white">Bio</Label>
            <Textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-dashboard-card border-white/10 focus:border-dashboard-accent/50 min-h-[100px] transition-colors"
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
          <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
            {isNew ? "Create Expert" : "Update Expert"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};