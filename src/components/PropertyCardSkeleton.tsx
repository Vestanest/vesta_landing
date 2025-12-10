

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700 animate-pulse">
        <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="absolute top-4 right-4 w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse"></div>
        
        {/* Location skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Stats skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-3">
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
