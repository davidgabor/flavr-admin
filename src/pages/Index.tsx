import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import ContentGrid from "@/components/dashboard/ContentGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-background text-white">
      <Sidebar />
      <main className="pl-16 lg:pl-64">
        <Header />
        <ContentGrid />
      </main>
    </div>
  );
};

export default Index;