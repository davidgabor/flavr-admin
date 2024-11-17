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

export const EditRecommendationDialog = ({
  recommendation,
}: {
  recommendation: any;
}) => {
  const { updateRecommendation } = useData();
  const [formData, setFormData] = useState({
    name: recommendation.name,
    type: recommendation.type,
    cuisine: recommendation.cuisine,
    price_level: recommendation.price_level,
    description: recommendation.description,
    image: recommendation.image,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateRecommendation(recommendation.id, formData);
      toast.success("Recommendation updated successfully");
    } catch (error) {
      toast.error("Failed to update recommendation");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dashboard-card text-white">
        <DialogHeader>
          <DialogTitle>Edit Recommendation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div>
            <Input
              placeholder="Type"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div>
            <Input
              placeholder="Cuisine"
              value={formData.cuisine}
              onChange={(e) =>
                setFormData({ ...formData, cuisine: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div>
            <Input
              placeholder="Price Level"
              value={formData.price_level}
              onChange={(e) =>
                setFormData({ ...formData, price_level: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div>
            <Input
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <div>
            <Textarea
              placeholder="Description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-white/5"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Recommendation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};