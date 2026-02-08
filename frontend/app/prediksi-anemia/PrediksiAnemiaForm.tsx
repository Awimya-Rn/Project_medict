"use client";

import { useState } from "react";
import PredictionResult from "@/components/PredictionResult";
import { Loader2 } from "lucide-react";

export default function PrediksiAnemiaForm() {
  const [formData, setFormData] = useState({
    gender: 0,
    hemoglobin: "",
    mch: "",
    mchc: "",
    mcv: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict_anemic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gender: Number(formData.gender),
          hemoglobin: Number(formData.hemoglobin),
          mch: Number(formData.mch),
          mchc: Number(formData.mchc),
          mcv: Number(formData.mcv),
        }),
      });

      if (!response.ok) throw new Error("Gagal melakukan prediksi");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Form Inputs Tetap Sama seperti sebelumnya ... */}
      {!result && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* ... (Input fields sama seperti kode sebelumnya) ... */}
            {/* Saya persingkat bagian input ini agar fokus ke perubahan logic */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Gender</label>
              <select name="gender" onChange={handleChange} className="input-field">
                <option value={0}>Female</option>
                <option value={1}>Male</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Hemoglobin</label>
              <input type="number" step="0.1" name="hemoglobin" required onChange={handleChange} className="input-field" placeholder="ex: 12.5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">MCH</label>
              <input type="number" step="0.1" name="mch" required onChange={handleChange} className="input-field" placeholder="ex: 28.0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">MCHC</label>
              <input type="number" step="0.1" name="mchc" required onChange={handleChange} className="input-field" placeholder="ex: 33.0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">MCV</label>
              <input type="number" step="0.1" name="mcv" required onChange={handleChange} className="input-field" placeholder="ex: 90.0" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Analisis Sekarang"}
          </button>
        </form>
      )}

      {/* UPDATE DI SINI: Passing description */}
      {result && (
        <PredictionResult
          result={result.result}
          code={result.prediction_code}
          type="anemia"
          description={result.description} // Pass deskripsi dari backend
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}