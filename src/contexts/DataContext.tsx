import { createContext, useContext, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type DataContextType = {
  destinations: any[];
  recommendations: any[];
  people: any[];
  blogPosts: any[];
  subscribers: any[];
  loading: boolean;
  refreshData: () => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  deleteRecommendation: (id: string) => Promise<void>;
  deletePerson: (id: string) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  updateDestination: (id: string, data: any) => Promise<void>;
  updateRecommendation: (id: string, data: any) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      
      const { data: destData, error: destError } = await supabase
        .from("destinations")
        .select("*");

      if (destError) {
        console.error("Error fetching destinations:", destError);
        toast.error("Failed to fetch destinations");
        return;
      }

      const { data: recsData, error: recsError } = await supabase
        .from("recommendations")
        .select("*");

      if (recsError) {
        console.error("Error fetching recommendations:", recsError);
        toast.error("Failed to fetch recommendations");
        return;
      }

      const { data: peopleData, error: peopleError } = await supabase
        .from("people")
        .select("*");

      if (peopleError) {
        console.error("Error fetching people:", peopleError);
        toast.error("Failed to fetch people");
        return;
      }

      const { data: blogData, error: blogError } = await supabase
        .from("blog_posts")
        .select("*")
        .order('created_at', { ascending: false });

      if (blogError) {
        console.error("Error fetching blog posts:", blogError);
        toast.error("Failed to fetch blog posts");
        return;
      }

      const { data: subscribersData, error: subscribersError } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order('created_at', { ascending: false });

      if (subscribersError) {
        console.error("Error fetching subscribers:", subscribersError);
        toast.error("Failed to fetch subscribers");
        return;
      }

      setDestinations(destData || []);
      setRecommendations(recsData || []);
      setPeople(peopleData || []);
      setBlogPosts(blogData || []);
      setSubscribers(subscribersData || []);
    } catch (error) {
      console.error("Error in refreshData:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const deleteDestination = async (id: string) => {
    try {
      const { error } = await supabase
        .from("destinations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Destination deleted");
      refreshData();
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast.error("Failed to delete destination");
    }
  };

  const deleteRecommendation = async (id: string) => {
    try {
      const { error } = await supabase
        .from("recommendations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Recommendation deleted");
      refreshData();
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      toast.error("Failed to delete recommendation");
    }
  };

  const deletePerson = async (id: string) => {
    try {
      const { error } = await supabase
        .from("people")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Person deleted");
      refreshData();
    } catch (error) {
      console.error("Error deleting person:", error);
      toast.error("Failed to delete person");
    }
  };

  const deleteBlogPost = async (id: string) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Blog post deleted");
      refreshData();
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    }
  };

  const updateDestination = async (id: string, data: any) => {
    try {
      const { error } = await supabase
        .from("destinations")
        .update(data)
        .eq("id", id);

      if (error) throw error;
      refreshData();
    } catch (error) {
      console.error("Error updating destination:", error);
      throw error;
    }
  };

  const updateRecommendation = async (id: string, data: any) => {
    try {
      const { error } = await supabase
        .from("recommendations")
        .update(data)
        .eq("id", id);

      if (error) throw error;
      refreshData();
    } catch (error) {
      console.error("Error updating recommendation:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        destinations,
        recommendations,
        people,
        blogPosts,
        subscribers,
        loading,
        refreshData,
        deleteDestination,
        deleteRecommendation,
        deletePerson,
        deleteBlogPost,
        updateDestination,
        updateRecommendation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};