import { TabsContent } from "@/components/ui/tabs";
import { DestinationCard } from "../cards/DestinationCard";
import { RecommendationCard } from "../cards/RecommendationCard";
import { PersonCard } from "../cards/PersonCard";
import { BlogPostCard } from "../cards/BlogPostCard";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";

interface ContentTabPanelProps {
  activeTab: string;
  destinations: any[];
  recommendations: any[];
  people: any[];
  blogPosts: any[];
}

export const ContentTabPanel = ({
  activeTab,
  destinations,
  recommendations,
  people,
  blogPosts,
}: ContentTabPanelProps) => {
  const { deleteDestination, deleteRecommendation, deletePerson, deleteBlogPost } = useData();

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
    </>
  );
};