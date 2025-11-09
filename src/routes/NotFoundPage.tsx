import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

