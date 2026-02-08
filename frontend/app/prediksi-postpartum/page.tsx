import PrediksiPostPartumForm from "./PrediksiPostPartumForm";

export default function PostPartumPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 relative overflow-hidden border border-purple-50">
        {/* Background Styling (Nuansa Ungu/Tenang untuk Mental Health) */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-50/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Mental Health</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Postpartum Depression Screening</h1>
          <p className="text-gray-500 mb-8 max-w-2xl">
            Screening instrument for postpartum depression risk based on maternal psychological and physical conditions.
          </p>

          <PrediksiPostPartumForm />
        </div>
      </div>
    </div>
  );
}