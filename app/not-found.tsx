import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        404 - ページが見つかりません
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link 
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
