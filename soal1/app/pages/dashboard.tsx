// pages/dashboard.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { isAuthenticated, getUser, logout } from '@/utils/auth';

export default function DashboardPage() {
  const router = useRouter();
  const user = getUser();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="flex items-center space-x-4">
              {user.image && (
                <img
                  className="h-16 w-16 rounded-full"
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">
                  Welcome, {user.firstName} {user.lastName}!
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-600">Username: {user.username}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}