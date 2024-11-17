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
import { ScrollArea } from "@/components/ui/scroll-area";

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
    images: recommendation.images || [],
    address: recommendation.address,
    neighborhood: recommendation.neighborhood,
    hours: recommendation.hours,
    latitude: recommendation.latitude,
    longitude: recommendation.longitude,
    website: recommendation.website,
    instagram: recommendation.instagram,
    phone: recommendation.phone,
    our_review: recommendation.our_review,
    rating: recommendation.rating,
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

  const handleImagesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageUrls = e.target.value.split('\n').filter(url => url.trim());
    setFormData({ ...formData, images: imageUrls });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dashboard-card text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Recommendation</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Input
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Cuisine</Label>
                <Input
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Price Level</Label>
                <Input
                  value={formData.price_level}
                  onChange={(e) => setFormData({ ...formData, price_level: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Neighborhood</Label>
                <Input
                  value={formData.neighborhood || ""}
                  onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Hours</Label>
                <Input
                  value={formData.hours || ""}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={formData.address || ""}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Latitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.latitude || ""}
                  onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                  className="bg-white/5"
                />
              </div>
              <div className="space-y-2">
                <Label>Longitude</Label>
                <Input
                  type="number"
                  step="any"
                  value={formData.longitude || ""}
                  onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                  className="bg-white/5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                value={formData.website || ""}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input
                value={formData.instagram || ""}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Main Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Images (one URL per line)</Label>
              <Textarea
                value={formData.images.join('\n')}
                onChange={handleImagesChange}
                className="bg-white/5 min-h-[100px]"
                placeholder="Enter image URLs, one per line"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <div className="space-y-2">
              <Label>Our Review</Label>
              <Textarea
                value={formData.our_review || ""}
                onChange={(e) => setFormData({ ...formData, our_review: e.target.value })}
                className="bg-white/5"
              />
            </div>

            <Button type="submit" className="w-full">
              Update Recommendation
            </Button>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};