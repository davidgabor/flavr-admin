import { useData } from "@/contexts/DataContext";
import { useEffect } from "react";
import { MapPin } from "lucide-react";

const Destinations = () => {
  const { destinations, loading, refreshData } = useData();

  useEffect(() => {
    refreshData();
    console.log("Destinations page mounted, refreshing data");
  }, []);

  // Group destinations by region
  const destinationsByRegion = destinations.reduce((acc, destination) => {
    const region = destination.region || "Other";
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(destination);
    return acc;
  }, {} as Record<string, typeof destinations>);

  return (
    <div className="min-h-screen bg-dashboard-background text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-dashboard-background z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080')] bg-cover bg-center"
          style={{ filter: 'brightness(0.4)' }}
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-judson font-bold tracking-tight sm:text-6xl mb-4 animate-fade-in">
              Explore Our Destinations
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-300 animate-fade-in">
              Discover handpicked locations across the globe, each offering unique culinary experiences and unforgettable moments.
            </p>
          </div>
        </div>
      </div>

      {/* Destinations by Region */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 glass-panel animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          Object.entries(destinationsByRegion).map(([region, regionDestinations]) => (
            <div key={region} className="mb-16">
              <div className="flex items-center gap-2 mb-8">
                <MapPin className="h-6 w-6 text-dashboard-accent" />
                <h2 className="text-3xl font-judson font-bold">{region}</h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regionDestinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="glass-panel rounded-lg overflow-hidden group hover:border-dashboard-accent/50 transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-judson font-bold mb-2">
                        {destination.name}
                      </h3>
                      <p className="text-dashboard-muted text-sm line-clamp-2">
                        {destination.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Destinations;