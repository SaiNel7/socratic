import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { signInCornell } from './lib/auth';
import { setToastCallback } from './lib/toast';
import Toast from './ui/Toast';
import type { ToastType } from './ui/Toast';
import type { Topic } from './types/database';
import type { User } from '@supabase/supabase-js';

function App() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    // Set up toast callback
    setToastCallback((message, type) => {
      setToast({ message, type });
    });

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthMessage('');

    try {
      await signInCornell(authEmail);
      setAuthMessage('Check your email for the magic link!');
      setAuthEmail('');
    } catch (err: any) {
      setAuthMessage(err.message || 'Failed to send magic link');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Socratic
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Sign In
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="absolute top-16 left-0 right-0 bg-white shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <Link
                to="/resources"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 mb-4 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === '/resources'
                    ? 'bg-green-50 text-green-700 shadow-sm border border-green-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Course Resources
                </div>
              </Link>
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
                        onClick={() => setMobileMenuOpen(false)}
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
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <Link
                to="/resources"
                className={`block px-4 py-3 mb-4 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === '/resources'
                    ? 'bg-green-50 text-green-700 shadow-sm border border-green-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Course Resources
                </div>
              </Link>
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

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthMessage('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Cornell Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="netid@cornell.edu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={authLoading}
                />
              </div>

              {authMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  authMessage.includes('Check your email') 
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {authMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {authLoading ? 'Sending...' : 'Send Magic Link'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We'll send you a magic link to sign in without a password
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
