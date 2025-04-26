export default function BookListSkeleton() {
  // 4つのスケルトンカードを表示
  return (
    <div className="mb-12">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div 
            key={index}
            className="flex flex-col rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800 h-full"
          >
            {/* 画像スケルトン */}
            <div className="relative aspect-[2/3] w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            
            <div className="p-4 flex flex-col flex-grow">
              {/* タイトルスケルトン */}
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse"></div>
              
              {/* 著者スケルトン */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2 animate-pulse"></div>
              
              {/* 評価スケルトン */}
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-1 mb-2 animate-pulse"></div>
              
              {/* 発売日スケルトン */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-auto animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
