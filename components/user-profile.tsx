"use client"

import React from 'react';
import { useAuth } from '@/components/auth-provider';
import { useRouter } from 'next/navigation';

const UserProfile = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-xl font-semibold text-indigo-600">
            {user.email?.[0].toUpperCase()}
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {user.email}
          </h2>
          <p className="text-sm text-gray-500">
            Member since {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 