import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { Rating } from '@/types/book';

interface StarRatingProps {
  rating: Rating;
  className?: string;
  'aria-label'?: string;
}

export default function StarRating({ 
  rating, 
  className = '',
  'aria-label': ariaLabel,
  ...props
}: StarRatingProps) {
  return (
    <div 
      className={`flex items-center ${className}`}
      aria-label={ariaLabel || `評価: ${rating}星`}
      {...props}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-yellow-400">
          {star <= rating ? (
            <FaStar className="w-4 h-4" />
          ) : (
            <FaRegStar className="w-4 h-4" />
          )}
        </span>
      ))}
      <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
        {rating}
      </span>
    </div>
  );
}
