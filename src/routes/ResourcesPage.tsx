import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Resource, ResourceCategory } from '../types/database';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('resources')
          .select('*')
          .order('order_index');

        if (fetchError) {
          console.error('Error fetching resources:', fetchError);
          setError(fetchError.message);
        } else {
          setResources(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load resources');
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const getCategoryIcon = (category: ResourceCategory) => {
    switch (category) {
      case 'Lecture Notes':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Practice Exams':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        );
      case 'Other Materials':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getCategoryColor = (category: ResourceCategory) => {
    switch (category) {
      case 'Lecture Notes':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Practice Exams':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Other Materials':
        return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<ResourceCategory, Resource[]>);

  const categories: ResourceCategory[] = ['Lecture Notes', 'Practice Exams', 'Other Materials'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Course Resources
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Access lecture notes, practice exam questions, and other course materials to help you study and prepare.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4 animate-pulse" />
              <div className="space-y-3">
                <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl p-6">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Resources by Category */}
      {!loading && !error && (
        <>
          {resources.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No resources available yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Resources will appear here once they're added to the database.
              </p>
            </div>
          ) : (
            categories.map((category) => {
              const categoryResources = groupedResources[category];
              if (!categoryResources || categoryResources.length === 0) return null;

              return (
                <div key={category} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    {getCategoryIcon(category)}
                    {category}
                  </h2>
                  <div className="space-y-3">
                    {categoryResources.map((resource) => (
                      <a
                        key={resource.id}
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                                {resource.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(resource.category)}`}>
                                {resource.category}
                              </span>
                            </div>
                            {resource.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {resource.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                              {resource.file_size && (
                                <span className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                  </svg>
                                  {resource.file_size}
                                </span>
                              )}
                              <span>
                                Added {new Date(resource.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </>
      )}
    </div>
  );
}

