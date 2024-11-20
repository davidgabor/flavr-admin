import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentTabPanel } from "./ContentTabPanel";

interface ContentTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  destinations: any[];
  recommendations: any[];
  people: any[];
  blogPosts: any[];
}

export const ContentTabs = ({
  activeTab,
  onTabChange,
  destinations,
  recommendations,
  people,
  blogPosts,
}: ContentTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="bg-dashboard-card w-full justify-start">
        <TabsTrigger value="destinations">Destinations</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        <TabsTrigger value="people">People</TabsTrigger>
        <TabsTrigger value="blog">Blog Posts</TabsTrigger>
      </TabsList>

      <ContentTabPanel
        activeTab={activeTab}
        destinations={destinations}
        recommendations={recommendations}
        people={people}
        blogPosts={blogPosts}
      />
    </Tabs>
  );
};