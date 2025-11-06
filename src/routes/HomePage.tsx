export default function HomePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Welcome to Socratic, PHIL 1100 students!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          A platform for you to optimize your learning for Prelim 3 via philosophical discussion and Socratic dialogue. Select a topic from the menu to begin exploring.
        </p>
      </div>

      {/* How to Participate Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 lg:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How to Participate</h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Share your insights, questions, or critiques about this topic by posting short, thoughtful notes to help everyone study smarter!
        </p>
        <br />
        {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                O
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Objections</h3>
              <p className="text-sm text-gray-600">Raise concerns or disagreements</p>
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

          <div className="flex gap-3 p-4 rounded-lg bg-indigo-50 border border-indigo-100">
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
        </div> */}
      </div>
    </div>
  );
}

