import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';
import { getBookById } from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

interface BookDetailPageProps {
  params: {
    id: string;
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const book = await getBookById(params.id);
  
  if (!book) {
    notFound();
  }
  
  // 発売日からの経過時間を計算
  let releaseTimeAgo = '';
  if (book.releaseDate) {
    try {
      releaseTimeAgo = formatDistanceToNow(new Date(book.releaseDate), { addSuffix: true, locale: ja });
    } catch (error) {
      console.error('Invalid date format:', book.releaseDate);
      releaseTimeAgo = '';
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/"
        className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-1" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
            clipRule="evenodd" 
          />
        </svg>
        ランキングに戻る
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 relative aspect-[2/3] w-full md:max-w-md">
            <Image
              src={book.imageUrl}
              alt={book.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
            
            {book.rank && (
              <div 
                className={`
                  absolute top-4 left-4 font-bold w-12 h-12 rounded-full 
                  flex items-center justify-center text-white text-lg
                  ${book.rank === 1 
                    ? 'bg-gradient-to-r from-amber-400 to-amber-600' 
                    : book.rank === 2 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-600' 
                      : book.rank === 3 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }
                `}
                aria-label={`ランキング ${book.rank}位`}
              >
                {book.rank}
              </div>
            )}
            
            {book.isNew && (
              <div 
                className="absolute top-4 right-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full"
                aria-label="新着"
              >
                NEW
              </div>
            )}
          </div>
          
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              著者: {book.author}
            </p>
            
            <div className="flex items-center mb-4">
              <StarRating 
                rating={book.rating} 
                className="text-lg"
                aria-label={`評価: ${book.rating}星`}
              />
              
              {book.reviewCount && book.reviewCount > 0 && (
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  ({book.reviewCount}件のレビュー)
                </span>
              )}
            </div>
            
            {book.genre && book.genre.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ジャンル:</p>
                <div className="flex flex-wrap gap-2">
                  {book.genre.map(genre => (
                    <span 
                      key={genre} 
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {book.publisher && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                出版社: {book.publisher}
              </p>
            )}
            
            {releaseTimeAgo && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                発売: {releaseTimeAgo}
              </p>
            )}
            
            <div className="mt-6">
              {book.purchaseUrl ? (
                <a 
                  href={book.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300 inline-block"
                  aria-label="楽天で購入"
                >
                  楽天で購入する
                </a>
              ) : (
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-colors duration-300"
                  aria-label="購入ページへ"
                  disabled
                >
                  購入ページへ
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            あらすじ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {book.description || 'この小説のあらすじはまだ登録されていません。'}
          </p>
        </div>
      </div>
    </div>
  );
}

import { getTopRankedBooks } from '@/lib/api';

// 静的生成のためのパスを生成
export async function generateStaticParams() {
  // 静的生成するページを制限（例：トップ10のみ）
  const books = await getTopRankedBooks(10);
  
  return books.map(book => ({
    id: book.id,
  }));
}
