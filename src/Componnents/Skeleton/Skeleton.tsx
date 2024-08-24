import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="p-6 border-b animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="flex justify-center">
        <div className="w-1/2 h-64 bg-gray-200 rounded"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default Skeleton;
