const LoadingCard = () => {
  return (
    <div className="glass-panel animate-fade-in rounded-lg p-4">
      <div className="loading-shimmer mb-3 h-4 w-2/3 rounded" />
      <div className="loading-shimmer mb-2 h-3 w-full rounded" />
      <div className="loading-shimmer h-3 w-4/5 rounded" />
    </div>
  );
};

export default LoadingCard;