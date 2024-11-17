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
import { Label } from "@/components/ui/label";

export const EditDestinationDialog = ({ destination }: { destination: any }) => {
  const { updateDestination } = useData();
  const [formData, setFormData] = useState({
    name: destination.name,
    country: destination.country,
    description: destination.description,
    image: destination.image,
    region: destination.region,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDestination(destination.id, formData);
      toast.success("Destination updated successfully");
    } catch (error) {
      toast.error("Failed to update destination");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-0 transition-opacity group-hover:opacity-100">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel border-dashboard-accent/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Destination</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Name</Label>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Country</Label>
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Region</Label>
            <Input
              placeholder="Region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Image URL</Label>
            <Input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-white">Description</Label>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-white/5 border-white/10 focus:border-dashboard-accent/50 min-h-[100px] transition-colors"
            />
          </div>
          <Button type="submit" className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 transition-colors">
            Update Destination
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};