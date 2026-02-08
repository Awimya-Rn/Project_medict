import type { Config } from 'tailwindcss'

const config: Config = {
  // Pastikan content path ini mencakup semua file Anda
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // INI BAGIAN PENTING: Mendaftarkan warna miku
        miku: {
          light: '#E0F7FA',
          DEFAULT: '#39C5BB', // Warna utama
          dark: '#2A9D95',
        },
        pink: {
          soft: '#FFB6C1',
        },
      },
    },
  },
  plugins: [],
}
export default config
