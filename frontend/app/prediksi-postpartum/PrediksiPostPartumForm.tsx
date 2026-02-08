"use client";

import { useState } from "react";
import PredictionResult from "@/components/PredictionResult";
import { Loader2 } from "lucide-react";

// Helper Component untuk Select (Tetap sama)
const SelectGroup = ({ label, name, value, onChange, options }: any) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="input-field appearance-none cursor-pointer"
      >
        <option value="" disabled>-- Pilih Opsi --</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </div>
    </div>
  </div>
);

export default function PrediksiPostPartumForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    age: "25-30",
    feeling_sad_or_tearful: "No",
    irritable_towards_baby_and_partner: "No",
    trouble_sleeping_at_night: "No",
    problems_concentrating_or_making_decision: "No",
    overeating_or_loss_of_appetite: "No",
    feeling_of_guilt: "No",
    problems_of_bonding_with_baby: "No",
    suicide_attempt: "No"
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/predict_post_natal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* ... (Isi Form SelectGroup tetap sama seperti sebelumnya) ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <SelectGroup label="Usia Ibu" name="age" value={formData.age} onChange={handleChange} options={["25-30", "30-35", "35-40", "40-45", "45-50"]} />
            <SelectGroup label="Merasa Sedih / Menangis?" name="feeling_sad_or_tearful" value={formData.feeling_sad_or_tearful} onChange={handleChange} options={["Yes", "No", "Sometimes"]} />
            <SelectGroup label="Mudah Marah?" name="irritable_towards_baby_and_partner" value={formData.irritable_towards_baby_and_partner} onChange={handleChange} options={["Yes", "No", "Sometimes"]} />
            <SelectGroup label="Susah Tidur?" name="trouble_sleeping_at_night" value={formData.trouble_sleeping_at_night} onChange={handleChange} options={["Yes", "No", "Two or more days a week"]} />
            <SelectGroup label="Sulit Konsentrasi?" name="problems_concentrating_or_making_decision" value={formData.problems_concentrating_or_making_decision} onChange={handleChange} options={["Yes", "No", "Often"]} />
            <SelectGroup label="Masalah Makan?" name="overeating_or_loss_of_appetite" value={formData.overeating_or_loss_of_appetite} onChange={handleChange} options={["Yes", "No", "Not at all"]} />
            <SelectGroup label="Merasa Bersalah?" name="feeling_of_guilt" value={formData.feeling_of_guilt} onChange={handleChange} options={["Yes", "No", "Maybe"]} />
            <SelectGroup label="Masalah Bonding?" name="problems_of_bonding_with_baby" value={formData.problems_of_bonding_with_baby} onChange={handleChange} options={["Yes", "No", "Sometimes"]} />
            <SelectGroup label="Percobaan Bunuh Diri?" name="suicide_attempt" value={formData.suicide_attempt} onChange={handleChange} options={["Yes", "No", "Not interested to say"]} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center gap-2 mt-6 bg-purple-500 hover:bg-purple-600 shadow-purple-500/30">
            {loading ? <Loader2 className="animate-spin" /> : "Analisis Mental Health"}
          </button>
        </form>
      )}

      {/* UPDATE DI SINI */}
      {result && (
        <PredictionResult
          result={result.result}
          code={result.prediction_code}
          type="anemia" // Pakai styling anemia (hijau/merah)
          description={result.description} // Pass AI Description
          onClose={() => setResult(null)}
        />
      )}
    </div>
  );
}