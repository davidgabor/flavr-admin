import { TabsContent } from "@/components/ui/tabs";
import { DestinationCard } from "../cards/DestinationCard";
import { RecommendationCard } from "../cards/RecommendationCard";
import { PersonCard } from "../cards/PersonCard";
import { BlogPostCard } from "../cards/BlogPostCard";
import { SubscribersTable } from "../tables/SubscribersTable";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTabPanelProps {
  activeTab: string;
  destinations: any[];
  recommendations: any[];
  people: any[];
  blogPosts: any[];
  subscribers: any[];
}

export const ContentTabPanel = ({
  activeTab,
  destinations,
  recommendations,
  people,
  blogPosts,
  subscribers,
}: ContentTabPanelProps) => {
  const { deleteDestination, deleteRecommendation, deletePerson, deleteBlogPost } = useData();
  const [selectedDestination, setSelectedDestination] = useState<string>("all");

  const handleDelete = async (type: "destination" | "recommendation" | "person" | "blog", id: string) => {
    try {
      if (type === "destination") {
        await deleteDestination(id);
      } else if (type === "recommendation") {
        await deleteRecommendation(id);
      } else if (type === "person") {
        await deletePerson(id);
      } else {
        await deleteBlogPost(id);
      }
      toast.success(`${type} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      toast.error(`Failed to delete ${type}`);
    }
  };

  const filteredRecommendations = selectedDestination === "all" 
    ? recommendations
    : recommendations.filter(rec => rec.destination_id === selectedDestination);

  return (
    <>
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
  <div className="mb-4">
    <Select value={selectedDestination} onValueChange={setSelectedDestination}>
      <SelectTrigger className="w-[280px] bg-dashboard-card text-white border-white/5">
        <SelectValue placeholder="Filter by destination" />
      </SelectTrigger>
      <SelectContent className="bg-dashboard-card border-white/5">
        <SelectItem value="all" className="text-white">All destinations</SelectItem>
        {destinations.map((dest) => (
          <SelectItem key={dest.id} value={dest.id} className="text-white">
            {dest.name}, {dest.country}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {filteredRecommendations.map((rec) => (
      <RecommendationCard
        key={rec.id}
        recommendation={rec}
        onDelete={(id) => handleDelete("recommendation", id)}
      />
    ))}
  </div>
</TabsContent>

      <TabsContent value="people" className="animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onDelete={(id) => handleDelete("person", id)}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="blog" className="animate-fade-in">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              onDelete={(id) => handleDelete("blog", id)}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="subscribers" className="animate-fade-in">
        <SubscribersTable subscribers={subscribers} />
      </TabsContent>
    </>
  );
};
