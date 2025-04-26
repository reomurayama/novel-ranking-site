import BookCard from './BookCard';
import { Book } from '@/types/book';

interface BookListProps {
  books: Book[];
  title?: string;
}

export default function BookList({ books, title }: BookListProps) {
  return (
    <section aria-labelledby={title ? "book-list-title" : undefined}>
      {title && (
        <h2 
          id="book-list-title" 
          className="text-2xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          {title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
          />
        ))}
      </div>
    </section>
  );
}
