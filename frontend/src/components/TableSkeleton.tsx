export default function TableSkeleton() {
  return (
    <div className="w-full animate-pulse border border-gray-200 rounded-lg overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-10 bg-gray-100 border-b border-gray-200"
        />
      ))}
    </div>
  );
}
