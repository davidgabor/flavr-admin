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
        <h1 className="text-2xl font-bold">Content Management</h1>
        <Button className="bg-dashboard-accent hover:bg-dashboard-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-dashboard-card w-full justify-start">
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="destinations">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest) => (
              <Card key={dest.id} className="bg-dashboard-card text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {dest.name}
                    <div className="flex gap-2">
                      <EditDestinationDialog destination={dest} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteDestination(dest.id)}
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

        <TabsContent value="recommendations">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="bg-dashboard-card text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {rec.name}
                    <div className="flex gap-2">
                      <EditRecommendationDialog recommendation={rec} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteRecommendation(rec.id)}
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
                        <h4 className="font-medium text-white">Description</h4>
                        <p className="text-sm text-dashboard-muted">{rec.description || "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Details</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-dashboard-muted">
                          <div>Cuisine: {rec.cuisine}</div>
                          <div>Rating: {rec.rating}</div>
                          <div>Neighborhood: {rec.neighborhood || "N/A"}</div>
                          <div>Hours: {rec.hours || "N/A"}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Contact</h4>
                        <div className="grid gap-1 text-sm text-dashboard-muted">
                          <div>Address: {rec.address || "N/A"}</div>
                          <div>Phone: {rec.phone || "N/A"}</div>
                          <div>Website: {rec.website || "N/A"}</div>
                          <div>Instagram: {rec.instagram || "N/A"}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Images</h4>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <img
                            src={rec.image}
                            alt={rec.name}
                            className="aspect-square rounded-md object-cover"
                          />
                          {rec.images?.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`${rec.name} ${index + 1}`}
                              className="aspect-square rounded-md object-cover"
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