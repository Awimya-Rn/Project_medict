import PrediksiAnemiaForm from "./PrediksiAnemiaForm";

export default function AnemiaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-soft/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-miku/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Anemia Prediction</h1>
          <p className="text-gray-500 mb-8">Input patient's blood test results to detect the risk of anemia.</p>

          <PrediksiAnemiaForm />
        </div>
      </div>
    </div>
  );
}