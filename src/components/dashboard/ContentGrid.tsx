import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingCard from "./LoadingCard";
import { EditDestinationDialog } from "./EditDestinationDialog";
import { EditRecommendationDialog } from "./EditRecommendationDialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContentGrid = () => {
  const {
    destinations,
    recommendations,
    loading,
    refreshData,
    deleteDestination,
    deleteRecommendation,
  } = useData();
  const [activeTab, setActiveTab] = useState("destinations");

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddNew = async (type: "destination" | "recommendation") => {
    try {
      const defaultData = type === "destination" 
        ? {
            name: "New Destination",
            country: "Unknown",
            description: "",
            image: "",
            region: "Other",
          }
        : {
            name: "New Recommendation",
            type: "Restaurant",
            cuisine: "",
            rating: 0,
            price_level: "$$",
            description: "",
            image: "",
            destination_id: destinations[0]?.id, // Default to first destination
          };

      const { data, error } = await supabase
        .from(type === "destination" ? "destinations" : "recommendations")
        .insert(defaultData)
        .select()
        .single();

      if (error) throw error;
      
      toast.success(`New ${type} created successfully`);
      refreshData();
    } catch (error) {
      console.error(`Error creating ${type}:`, error);
      toast.error(`Failed to create ${type}`);
    }
  };

  const handleDelete = async (type: "destination" | "recommendation", id: string) => {
    try {
      if (type === "destination") {
        await deleteDestination(id);
      } else {
        await deleteRecommendation(id);
      }
      toast.success(`${type} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Failed to delete ${type}`);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Flavr Admin</h1>
        <Button 
          className="bg-dashboard-accent hover:bg-dashboard-accent/90"
          onClick={() => handleAddNew(activeTab === "destinations" ? "destination" : "recommendation")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dashboard-card w-full justify-start">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations" className="animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <Card key={dest.id} className="group relative overflow-hidden bg-dashboard-card text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                {dest.image && (
                  <div className="absolute inset-0 -z-10">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="h-full w-full object-cover opacity-20"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="line-clamp-1">{dest.name}</span>
                    <div className="flex gap-2">
                      <EditDestinationDialog destination={dest} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete("destination", dest.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-dashboard-muted">
                    {dest.country}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-dashboard-muted">
                    {dest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="group relative overflow-hidden bg-dashboard-card text-white transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                {rec.image && (
                  <div className="absolute inset-0 -z-10">
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="h-full w-full object-cover opacity-20"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="line-clamp-1">{rec.name}</span>
                    <div className="flex gap-2">
                      <EditRecommendationDialog recommendation={rec} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete("recommendation", rec.id)}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-dashboard-muted">
                    {rec.type} • {rec.price_level}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="mb-1 font-medium text-white">Description</h4>
                        <p className="text-sm text-dashboard-muted">{rec.description || "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium text-white">Details</h4>
                        <div className="grid grid-cols-2 gap-2 rounded-lg bg-black/20 p-3 text-sm text-dashboard-muted">
                          <div>Cuisine: {rec.cuisine}</div>
                          <div>Rating: {rec.rating}</div>
                          <div>Neighborhood: {rec.neighborhood || "N/A"}</div>
                          <div>Hours: {rec.hours || "N/A"}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium text-white">Contact</h4>
                        <div className="grid gap-1.5 rounded-lg bg-black/20 p-3 text-sm text-dashboard-muted">
                          <div>Address: {rec.address || "N/A"}</div>
                          <div>Phone: {rec.phone || "N/A"}</div>
                          <div>Website: {rec.website || "N/A"}</div>
                          <div>Instagram: {rec.instagram || "N/A"}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium text-white">Images</h4>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <img
                            src={rec.image}
                            alt={rec.name}
                            className="aspect-square rounded-md object-cover transition-transform hover:scale-105"
                          />
                          {rec.images?.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${rec.name} ${index + 1}`}
                              className="aspect-square rounded-md object-cover transition-transform hover:scale-105"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGrid;