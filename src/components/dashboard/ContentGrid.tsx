import LoadingCard from "./LoadingCard";

const ContentGrid = () => {
  // Placeholder loading state
  const isLoading = true;

  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <LoadingCard key={i} />)
        : null}
    </div>
  );
};

export default ContentGrid;