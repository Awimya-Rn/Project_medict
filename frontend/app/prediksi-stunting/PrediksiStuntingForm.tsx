"use client";

import { useState } from "react";
import PredictionResult from "@/components/PredictionResult";
import { Loader2 } from "lucide-react";

export default function PrediksiStuntingForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    umur_bulan: "",
    jenis_kelamin: "laki-laki",
    tinggi_badan_cm: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        umur_bulan: parseInt(formData.umur_bulan),
        jenis_kelamin: formData.jenis_kelamin,
        tinggi_badan_cm: parseFloat(formData.tinggi_badan_cm)
      };

      const response = await fetch("http://localhost:8000/predict_stunting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Gagal melakukan prediksi");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Gagal koneksi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {!result && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ... (Input Form Stunting tetap sama) ... */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Umur (Bulan)</label>
            <input type="number" name="umur_bulan" required value={formData.umur_bulan} onChange={handleChange} className="input-field" placeholder="Contoh: 24" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Jenis Kelamin</label>
            <div className="relative">
              <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} className="input-field appearance-none">
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Tinggi Badan (cm)</label>
            <input type="number" step="0.1" name="tinggi_badan_cm" required value={formData.tinggi_badan_cm} onChange={handleChange} className="input-field" placeholder="Contoh: 85.5" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 shadow-orange-500/30">
            {loading ? <Loader2 className="animate-spin" /> : "Cek Status Gizi"}
          </button>
        </form>
      )}

      {/* UPDATE DI SINI */}
      {result && (
        <PredictionResult
          result={result.result}
          code={result.prediction_code}
          type="stunting"
          description={result.description} // Pass AI Description
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}