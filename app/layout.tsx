import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '小説ランキングサイト',
  description: '人気小説のランキングを紹介するサイトです',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <main className="min-h-screen py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
