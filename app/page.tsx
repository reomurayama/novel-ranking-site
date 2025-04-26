import { Suspense } from 'react';
import BookListSkeleton from '@/components/books/BookListSkeleton';
import NewBooksSection from './_components/NewBooksSection';
import RankedBooksSection from './_components/RankedBooksSection';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">小説ランキングサイト</h1>
      
      <Suspense fallback={<BookListSkeleton />}>
        <NewBooksSection />
      </Suspense>
      
      <Suspense fallback={<BookListSkeleton />}>
        <RankedBooksSection />
      </Suspense>
    </div>
  );
}
