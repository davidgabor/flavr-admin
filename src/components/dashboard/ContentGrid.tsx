import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import LoadingCard from "./LoadingCard";
import { ContentHeader } from "./content/ContentHeader";
import { ContentTabs } from "./content/ContentTabs";
import { ContentDialogs } from "./content/ContentDialogs";

const ContentGrid = () => {
  const {
    destinations,
    recommendations,
    people,
    blogPosts,
    loading,
    refreshData,
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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
      <ContentHeader onAddNew={handleAddNew} />
      <ContentTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        destinations={destinations}
        recommendations={recommendations}
        people={people}
        blogPosts={blogPosts}
      />
      {showNewDialog && (
        <ContentDialogs
          activeTab={activeTab}
          destinations={destinations}
          onClose={() => setShowNewDialog(false)}
        />
      )}
    </div>
  );
};

export default ContentGrid;