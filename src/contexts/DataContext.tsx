import { createContext, useContext, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type DataContextType = {
  destinations: any[];
  recommendations: any[];
  loading: boolean;
  refreshData: () => Promise<void>;
  deleteDestination: (id: string) => Promise<void>;
  deleteRecommendation: (id: string) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      setLoading(true);
      const [destResponse, recsResponse] = await Promise.all([
        supabase.from("destinations").select("*"),
        supabase.from("recommendations").select("*"),
      ]);

      if (destResponse.error) throw destResponse.error;
      if (recsResponse.error) throw recsResponse.error;

      setDestinations(destResponse.data || []);
      setRecommendations(recsResponse.data || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const deleteDestination = async (id: string) => {
    try {
      const { error } = await supabase.from("destinations").delete().eq("id", id);
      if (error) throw error;
      toast.success("Destination deleted");
      refreshData();
    } catch (error) {
      toast.error("Failed to delete destination");
    }
  };

  const deleteRecommendation = async (id: string) => {
    try {
      const { error } = await supabase.from("recommendations").delete().eq("id", id);
      if (error) throw error;
      toast.success("Recommendation deleted");
      refreshData();
    } catch (error) {
      toast.error("Failed to delete recommendation");
    }
  };

  return (
    <DataContext.Provider
      value={{
        destinations,
        recommendations,
        loading,
        refreshData,
        deleteDestination,
        deleteRecommendation,
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