import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-3xl shadow-2xl">
        <div className="text-6xl mb-4">🔍</div>
        <Loader2 className="w-16 h-16 text-blue-900 animate-spin mx-auto mb-4" />
        <p className="text-2xl text-gray-700 font-semibold">Loading historical evidence...</p>
      </div>
    </div>
  );
};
