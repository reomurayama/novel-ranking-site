import { Book, Rating } from '@/types/book';

// 楽天APIからのレスポンスの型定義
interface RakutenBookItem {
  Item: {
    title: string;
    author: string;
    itemUrl: string;
    affiliateUrl?: string;
    largeImageUrl?: string;
    mediumImageUrl?: string;
    smallImageUrl?: string;
    isbn?: string;
    itemCode?: string;
    salesDate: string;
    publisherName: string;
    reviewCount: number;
    reviewAverage: number;
    itemCaption?: string;
    genreId?: string;
    // その他の楽天APIから返されるフィールド
  }
}

interface RakutenResponse {
  Items: RakutenBookItem[];
  count: number;
  page: number;
  pageCount: number;
  hits: number;
}

  // 楽天APIからのレスポンスをBookインターフェースに変換する関数
function convertRakutenItemToBook(item: RakutenBookItem): Book {
  const rakutenItem = item.Item;
  
  // 評価を1-5の範囲に変換（楽天は0-5の範囲で小数点あり）
  let rating: Rating = 3; // デフォルト値
  if (rakutenItem.reviewAverage) {
    const roundedRating = Math.round(rakutenItem.reviewAverage);
    if (roundedRating >= 1 && roundedRating <= 5) {
      rating = roundedRating as Rating;
    }
  }
  
  // 日付形式の変換（楽天APIの日付形式は「YYYY年MM月」などの形式）
  let formattedReleaseDate: string | undefined = undefined;
  if (rakutenItem.salesDate) {
    // 「YYYY年MM月DD日」形式の場合
    const dateMatch = rakutenItem.salesDate.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
    if (dateMatch) {
      const [_, year, month, day] = dateMatch;
      formattedReleaseDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else {
      // 「YYYY年MM月」形式の場合
      const monthMatch = rakutenItem.salesDate.match(/(\d{4})年(\d{1,2})月/);
      if (monthMatch) {
        const [_, year, month] = monthMatch;
        formattedReleaseDate = `${year}-${month.padStart(2, '0')}-01`;
      } else {
        // その他の形式の場合は年だけ抽出
        const yearMatch = rakutenItem.salesDate.match(/(\d{4})/);
        if (yearMatch) {
          formattedReleaseDate = `${yearMatch[1]}-01-01`;
        }
      }
    }
  }
  
  // ジャンルの抽出（現在は固定値）
  const genres = ['小説', '文学'];
  
  return {
    id: rakutenItem.isbn || String(rakutenItem.itemCode) || String(Math.random()),
    title: rakutenItem.title,
    author: rakutenItem.author || '不明',
    imageUrl: rakutenItem.largeImageUrl || rakutenItem.mediumImageUrl || rakutenItem.smallImageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e',
    imageAlt: `${rakutenItem.title}の表紙`,
    rating: rating,
    releaseDate: formattedReleaseDate,
    reviewCount: rakutenItem.reviewCount,
    publisher: rakutenItem.publisherName,
    description: rakutenItem.itemCaption,
    genre: genres,
    purchaseUrl: rakutenItem.affiliateUrl || rakutenItem.itemUrl,
  };
}

// すべての書籍を取得
export async function getBooks(): Promise<Book[]> {
  const appId = process.env.RAKUTEN_APP_ID || '1072023420282562496';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || '45ea273e.4bcd5545.45ea273f.eec95cec';
  
  const url = new URL('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404');
  url.searchParams.append('applicationId', appId);
  url.searchParams.append('affiliateId', affiliateId);
  url.searchParams.append('hits', '30'); // 取得件数
  url.searchParams.append('sort', 'sales'); // 売上順
  url.searchParams.append('booksGenreId', '001'); // 書籍
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 } // 1時間ごとに再検証
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch books');
    }
    
    const data: RakutenResponse = await res.json();
    console.log('Rakuten API Response:', data);
    if (data.Items && data.Items.length > 0) {
      console.log('First item image URLs:', {
        largeImageUrl: data.Items[0].Item.largeImageUrl,
        mediumImageUrl: data.Items[0].Item.mediumImageUrl,
        smallImageUrl: data.Items[0].Item.smallImageUrl
      });
    }
    return data.Items.map(convertRakutenItemToBook);
  } catch (error) {
    console.error('Error fetching books:', error);
    // エラー時はサンプルデータを返す
    console.log('Falling back to sample data');
    return await import('./sample-data').then(module => module.sampleBooks);
  }
}

// 書籍詳細の取得
export async function getBookById(id: string): Promise<Book | undefined> {
  const appId = process.env.RAKUTEN_APP_ID || '1072023420282562496';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || '45ea273e.4bcd5545.45ea273f.eec95cec';
  
  const url = new URL('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404');
  url.searchParams.append('applicationId', appId);
  url.searchParams.append('affiliateId', affiliateId);
  
  // ISBNが数字のみの場合はISBNで検索、そうでない場合はタイトルで検索
  if (/^\d+$/.test(id)) {
    url.searchParams.append('isbn', id);
  } else {
    url.searchParams.append('title', id);
  }
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch book');
    }
    
    const data: RakutenResponse = await res.json();
    if (data.Items.length === 0) {
      return undefined;
    }
    
    return convertRakutenItemToBook(data.Items[0]);
  } catch (error) {
    console.error('Error fetching book:', error);
    // エラー時はサンプルデータから検索
    console.log('Falling back to sample data for book:', id);
    return await import('./sample-data').then(module => 
      module.sampleBooks.find(book => book.id === id)
    );
  }
}

// 新着書籍の取得
export async function getNewBooks(): Promise<Book[]> {
  const appId = process.env.RAKUTEN_APP_ID || '1072023420282562496';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || '45ea273e.4bcd5545.45ea273f.eec95cec';
  
  const url = new URL('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404');
  url.searchParams.append('applicationId', appId);
  url.searchParams.append('affiliateId', affiliateId);
  url.searchParams.append('hits', '10');
  url.searchParams.append('sort', '+releaseDate'); // 発売日順（新しい順）
  url.searchParams.append('booksGenreId', '001');
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch new books');
    }
    
    const data: RakutenResponse = await res.json();
    const books = data.Items.map(convertRakutenItemToBook);
    
    // 発売日から30日以内の書籍を「新着」とする
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return books.map(book => ({
      ...book,
      isNew: book.releaseDate ? new Date(book.releaseDate) >= thirtyDaysAgo : false
    }));
  } catch (error) {
    console.error('Error fetching new books:', error);
    // エラー時はサンプルデータから新着書籍を取得
    console.log('Falling back to sample data for new books');
    return await import('./sample-data').then(module => {
      const books = module.sampleBooks;
      // 発売日から30日以内の書籍を「新着」とする
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      return books
        .filter(book => book.isNew || (book.releaseDate && new Date(book.releaseDate) >= thirtyDaysAgo))
        .map(book => ({
          ...book,
          isNew: true
        }));
    });
  }
}

// ランキング上位の書籍取得
export async function getTopRankedBooks(limit: number = 10): Promise<Book[]> {
  const appId = process.env.RAKUTEN_APP_ID || '1072023420282562496';
  const affiliateId = process.env.RAKUTEN_AFFILIATE_ID || '45ea273e.4bcd5545.45ea273f.eec95cec';
  
  const url = new URL('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404');
  url.searchParams.append('applicationId', appId);
  url.searchParams.append('affiliateId', affiliateId);
  url.searchParams.append('hits', String(limit));
  url.searchParams.append('sort', 'sales'); // 売上順
  url.searchParams.append('booksGenreId', '001');
  
  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch ranked books');
    }
    
    const data: RakutenResponse = await res.json();
    const books = data.Items.map(convertRakutenItemToBook);
    
    // ランク付け
    return books.map((book, index) => ({
      ...book,
      rank: index + 1
    }));
  } catch (error) {
    console.error('Error fetching ranked books:', error);
    // エラー時はサンプルデータからランキング上位の書籍を取得
    console.log('Falling back to sample data for ranked books');
    return await import('./sample-data').then(module => {
      const books = module.sampleBooks;
      // ランク順にソートして上位を返す
      return books
        .sort((a, b) => (a.rank || 999) - (b.rank || 999))
        .slice(0, limit)
        .map((book, index) => ({
          ...book,
          rank: index + 1
        }));
    });
  }
}
