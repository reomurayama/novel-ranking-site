import BookList from '@/components/books/BookList';
import { getTopRankedBooks } from '@/lib/api';

export default async function RankedBooksSection() {
  const rankedBooks = await getTopRankedBooks();
  
  return (
    <div>
      <BookList 
        books={rankedBooks} 
        title="人気ランキング" 
      />
    </div>
  );
}
