import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import LoadingCard from "./LoadingCard";
import { DestinationCard } from "./cards/DestinationCard";
import { RecommendationCard } from "./cards/RecommendationCard";
import { ExpertCard } from "./cards/ExpertCard";
import { EditDestinationDialog } from "./EditDestinationDialog";
import { EditRecommendationDialog } from "./EditRecommendationDialog";
import { EditExpertDialog } from "./EditExpertDialog";

const ContentGrid = () => {
  const {
    destinations,
    recommendations,
    experts,
    loading,
    refreshData,
    deleteDestination,
    deleteRecommendation,
    deleteExpert,
  } = useData();
  const [activeTab, setActiveTab] = useState("destinations");
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const handleAddNew = () => {
    if (activeTab === "recommendations" && !destinations.length) {
      toast.error("Please create a destination first");
      return;
    }
    setShowNewDialog(true);
  };

  const handleDelete = async (type: "destination" | "recommendation" | "expert", id: string) => {
    try {
      if (type === "destination") {
        await deleteDestination(id);
      } else if (type === "recommendation") {
        await deleteRecommendation(id);
      } else {
        await deleteExpert(id);
      }
      toast.success(`${type} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Failed to delete ${type}`);
    }
  };

  const defaultNewDestination = {
    id: crypto.randomUUID(),
    name: "",
    country: "",
    description: "",
    image: "",
    region: "Other",
  };

  const defaultNewRecommendation = {
    id: crypto.randomUUID(),
    name: "",
    type: "Restaurant",
    cuisine: "",
    rating: 0,
    price_level: "$$",
    description: "",
    image: "",
    destination_id: destinations[0]?.id,
  };

  const defaultNewExpert = {
    name: "",
    bio: "",
    image: "",
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
        <h1 className="text-3xl font-judson font-bold">Flavr Admin</h1>
        <Button 
          className="bg-dashboard-accent hover:bg-dashboard-accent/90"
          onClick={handleAddNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dashboard-card w-full justify-start">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="experts">Experts</TabsTrigger>
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

        <TabsContent value="experts" className="animate-fade-in">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onDelete={(id) => handleDelete("expert", id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showNewDialog && activeTab === "destinations" && (
        <EditDestinationDialog
          destination={defaultNewDestination}
          isNew={true}
          onClose={() => setShowNewDialog(false)}
        />
      )}

      {showNewDialog && activeTab === "recommendations" && (
        <EditRecommendationDialog
          recommendation={defaultNewRecommendation}
          isNew={true}
          onClose={() => setShowNewDialog(false)}
        />
      )}

      {showNewDialog && activeTab === "experts" && (
        <EditExpertDialog
          expert={defaultNewExpert}
          isNew={true}
          onClose={() => setShowNewDialog(false)}
        />
      )}
    </div>
  );
};

export default ContentGrid;