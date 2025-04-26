/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // カスタムカラーがあれば追加
      },
      animation: {
        // カスタムアニメーションがあれば追加
      },
    },
  },
  plugins: [],
  darkMode: 'class', // ダークモードサポート
}
