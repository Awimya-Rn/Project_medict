import { motion } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';

interface Props {
  result: string;
  code: number;
  type: 'anemia' | 'fetal' | 'stunting'; // Tipe styling
  description?: string; // Prop baru untuk teks dari Gemini
  onClose: () => void;
}

export default function PredictionResult({ result, code, type, description, onClose }: Props) {
  // Tentukan warna berdasarkan tipe dan hasil (Logic sederhana untuk pewarnaan)
  const isDanger =
    (type === 'anemia' && result === "Anemic") ||
    (type === 'fetal' && result !== "Normal") ||
    (type === 'stunting' && result !== "Normal");

  const colorTheme = isDanger ? "red" : "teal"; // Base color logic

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-6 md:p-8 rounded-3xl bg-white shadow-2xl border border-gray-100 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-40 h-40 bg-${colorTheme}-100 opacity-50 rounded-full -mr-10 -mt-10 blur-2xl`}></div>

      {/* Header Hasil */}
      <div className="relative z-10">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Hasil Analisis Model</h3>
        <div className="flex items-end gap-3 mb-6">
          <h2 className={`text-4xl font-extrabold ${isDanger ? 'text-red-500' : 'text-teal-600'}`}>
            {result}
          </h2>
          <span className="text-gray-400 text-sm mb-2 font-mono bg-gray-100 px-2 py-1 rounded-lg">Code: {code}</span>
        </div>

        {/* Bagian Gemini AI Description */}
        {description ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 p-5 rounded-2xl relative">
            <div className="flex items-center gap-2 mb-3 text-blue-600 font-bold text-sm">
              <Sparkles className="w-4 h-4 fill-blue-400" />
              <span>Analisis AI & Saran Kesehatan</span>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line text-justify">
              {description}
            </p>

            <div className="absolute top-4 right-4 text-blue-200">
              <Bot className="w-6 h-6" />
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">
            *Deskripsi AI tidak tersedia atau API Key belum dikonfigurasi.
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full py-3 rounded-xl border border-gray-200 text-gray-500 font-semibold hover:bg-gray-50 transition text-sm"
      >
        Tutup & Reset Form
      </button>
    </motion.div>
  );
}