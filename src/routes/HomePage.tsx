export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Socratic
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          A platform for philosophical discussion and Socratic dialogue. Select a topic from the sidebar to begin exploring.
        </p>
      </div>

      {/* How to Participate Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Participate</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                C
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Claims</h3>
              <p className="text-sm text-gray-600">Assert a philosophical position</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-green-50 border border-green-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                R
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Reasons</h3>
              <p className="text-sm text-gray-600">Provide support for claims</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-red-50 border border-red-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                C
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Counterexamples</h3>
              <p className="text-sm text-gray-600">Challenge claims with specific cases</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-purple-50 border border-purple-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                C
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Critiques</h3>
              <p className="text-sm text-gray-600">Analyze and evaluate arguments</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-yellow-50 border border-yellow-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
                D
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Definitions</h3>
              <p className="text-sm text-gray-600">Clarify key terms and concepts</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-pink-50 border border-pink-100">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
                Q
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Quotes</h3>
              <p className="text-sm text-gray-600">Share relevant philosophical texts</p>
            </div>
          </div>

          <div className="flex gap-3 p-4 rounded-lg bg-indigo-50 border border-indigo-100 sm:col-span-2">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                ?
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Questions</h3>
              <p className="text-sm text-gray-600">Probe deeper into ideas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

