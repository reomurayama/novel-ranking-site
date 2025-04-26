import BookList from '@/components/books/BookList';
import { getNewBooks } from '@/lib/api';

export default async function NewBooksSection() {
  const newBooks = await getNewBooks();
  
  if (newBooks.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <BookList 
        books={newBooks} 
        title="新着小説" 
      />
    </div>
  );
}
