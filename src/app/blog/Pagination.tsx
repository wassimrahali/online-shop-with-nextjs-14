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
          className={`px-4 py-2 border transition-colors duration-150 ${
            currentPage === 1 ? '  border-green-500 bg-green-500 text-white cursor-not-allowed' : 'bg-green-500 hover:bg-gray-300 text-white'
          }`}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border transition-colors duration-150 ${
                page === currentPage ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 border  transition-colors duration-150 ${
            currentPage === totalPages ? ' border-green-600 bg-green-500 text-white cursor-not-allowed' : 'bg-green-500 hover:bg-gray-300 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
