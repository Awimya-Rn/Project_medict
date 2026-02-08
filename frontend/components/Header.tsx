import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

export default function Header() {
  return (
    /* Tambahkan w-full dan sticky agar header menempel di atas dengan rapi */
    <header className="w-full sticky top-0 z-50 bg-[#F4F9F9]/80 backdrop-blur-md border-b border-gray-100/50">

      {/* Container utama dengan w-full dan justify-between */}
      <nav className="w-full max-w-7xl mx-auto px-6 md:px-8 py-5 flex items-center justify-between">

        {/* 1. BAGIAN KIRI (Logo) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-miku/10 p-2 rounded-xl">
            <HeartPulse className="text-miku w-6 h-6 md:w-7 md:h-7" />
          </div>
          <Link href="/" className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">
            MidWife 
          </Link>
        </div>

        {/* 2. BAGIAN TENGAH (Menu Navigasi) 
            Saya tambahkan styling 'pill' (kapsul) putih agar mirip area 'Search' di desain referensi
        */}
        <div className="hidden md:flex items-center gap-6 font-medium text-gray-500 bg-white px-8 py-3 rounded-full shadow-sm border border-gray-100">
          <Link href="/" className="text-gray-800 font-semibold hover:text-miku transition">Home</Link>
          <div className="w-px h-4 bg-gray-200"></div>
          <Link href="/prediksi-anemia" className="hover:text-miku transition">Anemia</Link>
          <Link href="/prediksi-postpartum" className="hover:text-miku transition">PostPartum</Link>
          <Link href="/prediksi-stunting" className="hover:text-miku transition">Stunting</Link>
        </div>

        {/* 3. BAGIAN KANAN (Tombol Login/Signup)
        <div className="flex items-center gap-3 shrink-0">
          <button className="hidden sm:block text-gray-600 font-medium hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100 transition">
            Log in
          </button>
          <button className="bg-miku hover:bg-miku-dark text-gray-800 px-5 py-2.5 rounded-full font-medium shadow-lg shadow-miku/20 transition-all active:scale-95 transform">
            Sign up
          </button>
        </div> */}

      </nav>
    </header>
  );
}