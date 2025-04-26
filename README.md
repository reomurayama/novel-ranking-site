# 小説ランキングサイト

Next.js + TypeScript + Tailwind CSSで構築された小説ランキングサイトのプロジェクトです。

## 機能

- 人気小説のランキング表示
- 新着小説の表示
- 書籍詳細ページ
- レスポンシブデザイン（モバイル・タブレット・デスクトップ対応）
- ダークモード対応
- アクセシビリティ対応

## 技術スタック

- **フロントエンド**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - React Server Components

## コンポーネント構成

### BookCard

書籍カードコンポーネントは以下の要素を表示します：

1. 書影（画像）
2. タイトル
3. 著者名
4. 星評価（1～5）
5. クリックで詳細ページへ遷移
6. レスポンシブ対応（モバイルは1列、デスクトップは4列）
7. アクセシビリティとしてalt テキスト／aria属性を付与

### その他のコンポーネント

- **StarRating**: 星評価を表示するコンポーネント
- **BookList**: 書籍カードのリストを表示するコンポーネント
- **BookListSkeleton**: データ読み込み中に表示するスケルトンUI

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/novel-ranking-site.git
cd novel-ranking-site

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

## ビルドと本番環境へのデプロイ

```bash
# 本番用ビルド
npm run build

# 本番サーバーの起動
npm start
```

## プロジェクト構造

```
novel-ranking-site/
├── app/                      # Next.js App Router
│   ├── _components/          # ページ固有のコンポーネント
│   ├── books/[id]/           # 書籍詳細ページ
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   ├── not-found.tsx         # 404ページ
│   └── page.tsx              # ホームページ
├── components/               # 共通コンポーネント
│   ├── books/                # 書籍関連コンポーネント
│   │   ├── BookCard.tsx      # 書籍カードコンポーネント
│   │   ├── BookList.tsx      # 書籍リストコンポーネント
│   │   └── BookListSkeleton.tsx # スケルトンUI
│   └── ui/                   # UI共通コンポーネント
│       └── StarRating.tsx    # 星評価コンポーネント
├── lib/                      # ユーティリティ関数
│   ├── api.ts                # APIクライアント
│   └── sample-data.ts        # サンプルデータ
├── types/                    # 型定義
│   └── book.ts               # 書籍関連の型定義
├── .gitignore                # Gitの除外ファイル設定
├── next.config.js            # Next.jsの設定
├── package.json              # プロジェクト依存関係
├── postcss.config.js         # PostCSSの設定
├── tailwind.config.js        # Tailwind CSSの設定
└── tsconfig.json             # TypeScriptの設定
