import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingCard from "./LoadingCard";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { DestinationCard } from "./cards/DestinationCard";
import { RecommendationCard } from "./cards/RecommendationCard";

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
            destination_id: destinations[0]?.id,
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
              <DestinationCard
                key={dest.id}
                destination={dest}
                onDelete={(id) => handleDelete("destination", id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onDelete={(id) => handleDelete("recommendation", id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentGrid;