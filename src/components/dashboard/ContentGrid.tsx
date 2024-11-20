import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import LoadingCard from "./LoadingCard";
import { DestinationCard } from "./cards/DestinationCard";
import { RecommendationCard } from "./cards/RecommendationCard";
import { PersonCard } from "./cards/PersonCard";
import { BlogPostCard } from "./cards/BlogPostCard";
import { EditDestinationDialog } from "./EditDestinationDialog";
import { EditRecommendationDialog } from "./EditRecommendationDialog";
import { EditPersonDialog } from "./EditPersonDialog";
import { EditBlogPostDialog } from "./EditBlogPostDialog";

const ContentGrid = () => {
  const {
    destinations,
    recommendations,
    people,
    blogPosts,
    loading,
    refreshData,
    deleteDestination,
    deleteRecommendation,
    deletePerson,
    deleteBlogPost,
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

  const defaultNewPerson = {
    name: "",
    bio: "",
    image: "",
  };

  const defaultNewBlogPost = {
    id: crypto.randomUUID(),
    title: "",
    slug: "",
    content: "",
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
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
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

      {showNewDialog && activeTab === "people" && (
        <EditPersonDialog
          person={defaultNewPerson}
          isNew={true}
          onClose={() => setShowNewDialog(false)}
        />
      )}

      {showNewDialog && activeTab === "blog" && (
        <EditBlogPostDialog
          post={defaultNewBlogPost}
          isNew={true}
          onClose={() => setShowNewDialog(false)}
        />
      )}
    </div>
  );
};

export default ContentGrid;
