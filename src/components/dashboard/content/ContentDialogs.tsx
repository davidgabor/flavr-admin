import { EditDestinationDialog } from "../EditDestinationDialog";
import { EditRecommendationDialog } from "../EditRecommendationDialog";
import { EditPersonDialog } from "../EditPersonDialog";
import { EditBlogPostDialog } from "../EditBlogPostDialog";

interface ContentDialogsProps {
  activeTab: string;
  destinations: any[];
  onClose: () => void;
}

export const ContentDialogs = ({ activeTab, destinations, onClose }: ContentDialogsProps) => {
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

  return (
    <>
      {activeTab === "destinations" && (
        <EditDestinationDialog
          destination={defaultNewDestination}
          isNew={true}
          onClose={onClose}
        />
      )}

      {activeTab === "recommendations" && (
        <EditRecommendationDialog
          recommendation={defaultNewRecommendation}
          isNew={true}
          onClose={onClose}
        />
      )}

      {activeTab === "people" && (
        <EditPersonDialog
          person={defaultNewPerson}
          isNew={true}
          onClose={onClose}
        />
      )}

      {activeTab === "blog" && (
        <EditBlogPostDialog
          post={defaultNewBlogPost}
          isNew={true}
          onClose={onClose}
        />
      )}
    </>
  );
};