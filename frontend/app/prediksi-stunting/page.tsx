import PrediksiStuntingForm from "./PrediksiStuntingForm";

export default function StuntingPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-10 relative overflow-hidden border border-orange-100">

        {/* Background Styling (Nuansa Oranye/Ceria untuk Anak) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100/50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Child Growth
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">Child Growth Monitoring</h1>
          <p className="text-gray-500 mb-8">
            Monitoring child growth and development.
          </p>

          <PrediksiStuntingForm />
        </div>
      </div>
    </div>
  );
}