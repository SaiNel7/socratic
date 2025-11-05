import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import type { Topic } from './types/database';

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('topics')
          .select('*')
          .order('order_index');
        
        if (fetchError) {
          console.error('Error fetching topics:', fetchError);
          setError(fetchError.message);
        } else {
          setTopics(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load topics');
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Socratic
            </Link>
            <nav className="flex gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                Topics
              </h2>
              <nav className="space-y-1">
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 bg-gray-100 rounded-md animate-pulse" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-sm text-red-600 p-2">
                    {error}
                  </div>
                ) : topics.length === 0 ? (
                  <div className="text-sm text-gray-500 p-2">
                    No topics yet. Add some topics to your Supabase database!
                  </div>
                ) : (
                  topics.map((topic) => {
                    const isActive = location.pathname === `/t/${topic.slug}`;
                    return (
                      <Link
                        key={topic.id}
                        to={`/t/${topic.slug}`}
                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {topic.title}
                      </Link>
                    );
                  })
                )}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
