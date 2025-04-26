// 星評価の型定義
export type Rating = 1 | 2 | 3 | 4 | 5;

// 書籍データの型定義
export interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  imageAlt: string;
  rating: Rating;
  rank?: number;
  releaseDate?: string;
  reviewCount?: number;
  purchaseCount?: number;
  isNew?: boolean;
  description?: string;
  genre?: string[];
  publisher?: string;
  purchaseUrl?: string; // 購入リンク（アフィリエイトリンク）
}

// BookCardコンポーネントのProps
export interface BookCardProps extends Book {
  className?: string;
}
