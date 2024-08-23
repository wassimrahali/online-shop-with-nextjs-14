'use client';
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void; }) => {
  const [pages, setPages] = useState(Array.from({ length: totalPages }, (_, i) => i + 1));

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto mt-12 px-4 md:px-8">
      <div className="flex items-center justify-center space-x-4 text-sm font-medium">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded-lg transition-colors duration-150 ${
            currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded-lg transition-colors duration-150 ${
                page === currentPage ? 'bg-primary text-white border-primary' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border rounded-lg transition-colors duration-150 ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
