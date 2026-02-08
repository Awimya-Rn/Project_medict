import Link from 'next/link';
import { Activity, ArrowRight, Brain, Ruler } from 'lucide-react';
import Image from 'next/image';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#A0E9E5] to-[#71DCD3] rounded-[2.5rem] p-8 md:p-16 relative overflow-visible shadow-xl shadow-miku/10 mt-6 min-h-[500px] flex items-center">

        {/* Dekorasi Background (Lingkaran halus) */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-teal-200/40 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-white/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-teal-800 tracking-wide uppercase">
              AI Powered System
            </span>
          </div>

          {/* Judul: Warna diganti ke Teal Gelap agar Jelas */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-[1.1] text-teal-900">
            Main Maternal <br />
            <span className="text-white drop-shadow-md">& Fetal Health</span>
          </h1>

          {/* Deskripsi: Warna diganti agar terbaca */}
          <p className="text-lg text-teal-800/90 font-medium mb-10 max-w-md leading-relaxed">
            An intelligent system for early detection of the risk of <b>Anemia</b> in pregnant women and monitoring <b>Fetal Health</b> accurately.
          </p>

        </div>

        {/* Gambar Ilustrasi: Diperbaiki agar tidak terpotong */}
        <div className="hidden md:block absolute bottom-0 right-0 w-[45%] h-[110%] pointer-events-none">
          {/* Pastikan file gambar ada di folder public.
              Gunakan object-contain dan positioning bottom agar karakter 'berdiri' di bawah 
           */}
          <img
            src="/assets/icon.png"  // Ganti dengan nama file gambar miku Anda yang benar
            alt="Miku Doctor Illustration"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

        {/* Card 1: Anemia */}
        <Link href="/prediksi-anemia" className="group glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 bg-white border border-gray-100 shadow-lg shadow-gray-100/50">
          <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-200 transition">
            <Activity className="text-teal-500 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Anemia Prediction</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Analysis of Hemoglobin, MCH, MCHC levels for early detection of anemia in pregnant women.</p>
          <div className="flex items-center text-teal-600 font-bold text-sm bg-teal-50 w-fit px-4 py-2 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors">
            Start Analysis <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </Link>


        {/* Card 4: Info / Stats */}
        <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-xl">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-800">System Status</h3>
            <p className="text-gray-400 text-sm mb-6">Real-time monitoring stats.</p>
            <ul className="space-y-4">
              <li className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div> Anemia Model</span>
                <span className="text-green-400 font-bold">Active</span>
              </li>
              <li className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div> PostPartum Model</span>
                <span className="text-green-400 font-bold">Active</span>
              </li>
              <li className="flex items-center justify-between text-sm bg-white/10 p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-2 text-gray-500"><div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div> Stunting Model</span>
                <span className="text-green-400 font-bold">Active</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Card 2: PostPartum (BARU) */}
        <Link href="/prediksi-postpartum" className="group glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 bg-white border border-gray-100 shadow-lg shadow-gray-100/50">
          <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition">
            {/* Menggunakan Icon Brain untuk kesehatan mental */}
            <Brain className="text-purple-600 w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Postpartum Dep.</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Risk screening for postpartum depression to maintain maternal and infant mental health.</p>
          <div className="flex items-center text-purple-600 font-bold text-sm bg-purple-50 w-fit px-4 py-2 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
            Start Screening <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </Link>

        {/* Card 5: Image 1 */}
        <div className="glass-panel p-7 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl relative group min-h-[300px]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={img1}
              alt="Dashboard Image 1"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Card 4: Stunting (BARU) */}
        <Link href="/prediksi-stunting" className="group glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 bg-white border border-gray-100 shadow-lg shadow-gray-100/50">
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition">
            <Ruler className="text-orange-600 w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Child Growth Monitoring</h3>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Monitor child growth and development.
          </p>
          <div className="flex items-center text-orange-600 font-bold text-sm bg-orange-50 w-fit px-4 py-2 rounded-full group-hover:bg-orange-600 group-hover:text-white transition-colors">
            Start <ArrowRight className="w-4 h-4 ml-2" />
          </div>
        </Link>



        {/* Card 6: Image 2 */}
        <div className="glass-panel p-7 rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl relative group min-h-[300px]">
          <div className="relative w-full h-full rounded-2xl overflow-hidden">
            <Image
              src={img2}
              alt="Dashboard Image 2"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </div>
  );
}