import Header from "@/components/dashboard/Header";
import ContentGrid from "@/components/dashboard/ContentGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-background text-white">
      <Header />
      <ContentGrid />
    </div>
  );
};

export default Index;