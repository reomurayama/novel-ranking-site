import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import StarRating from '../ui/StarRating';
import { BookCardProps } from '@/types/book';

export default function BookCard({
  id,
  imageUrl,
  imageAlt,
  title,
  author,
  rating,
  rank,
  releaseDate,
  reviewCount,
  isNew = false,
  className = '',
}: BookCardProps) {
  // 発売日からの経過時間を計算
  let releaseTimeAgo = '';
  if (releaseDate) {
    try {
      releaseTimeAgo = formatDistanceToNow(new Date(releaseDate), { addSuffix: true, locale: ja });
    } catch (error) {
      console.error('Invalid date format:', releaseDate);
      releaseTimeAgo = '';
    }
  }
  
  return (
    <div 
      className={`
        flex flex-col rounded-lg overflow-hidden h-full
        transition-all duration-300 
        ${rank === 1 
          ? 'shadow-lg shadow-amber-200/50 border-2 border-amber-400 hover:shadow-amber-200/70' 
          : rank === 2 
            ? 'shadow-lg shadow-gray-200/50 border-2 border-gray-400 hover:shadow-gray-200/70' 
            : rank === 3 
              ? 'shadow-lg shadow-orange-200/50 border-2 border-orange-400 hover:shadow-orange-200/70'
              : 'shadow-md hover:shadow-xl hover:-translate-y-1'
        }
        bg-white dark:bg-gray-800
        ${className}
      `}
    >
      <Link 
        href={`/books/${id}`}
        className="flex flex-col h-full group"
        aria-labelledby={`book-title-${id}`}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={isNew || (!!rank && rank <= 3)}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5jfZixgAAAABJRU5ErkJggg=="
          />
          
          {rank && (
            <div 
              className={`
                absolute top-2 left-2 font-bold w-8 h-8 rounded-full 
                flex items-center justify-center text-white
                ${rank === 1 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600' 
                  : rank === 2 
                    ? 'bg-gradient-to-r from-gray-400 to-gray-600' 
                    : rank === 3 
                      ? 'bg-gradient-to-r from-orange-400 to-orange-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                }
              `}
              aria-label={`ランキング ${rank}位`}
            >
              {rank}
            </div>
          )}
          
          {isNew && (
            <div 
              className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              aria-label="新着"
            >
              NEW
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 
            id={`book-title-${id}`}
            className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          >
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {author}
          </p>
          
          <div className="flex items-center mt-1 mb-2">
            <StarRating 
              rating={rating} 
              aria-label={`評価: ${rating}星`}
            />
            
            {reviewCount && reviewCount > 0 && (
              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                ({reviewCount}件)
              </span>
            )}
          </div>
          
          {releaseTimeAgo && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
              発売: {releaseTimeAgo}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
