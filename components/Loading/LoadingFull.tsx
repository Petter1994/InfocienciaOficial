'use client';

import Spinner from '@/components/Loading/Spiner';

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <Spinner size="lg" color="#2563eb" />
        <p className="mt-3 text-gray-700">Procesando tu solicitud...</p>
      </div>
    </div>
  );
}