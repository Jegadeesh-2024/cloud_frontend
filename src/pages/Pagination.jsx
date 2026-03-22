import { useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {

  const [showMore, setShowMore] = useState(false);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const renderPages = () => {
    let pages = [];

    if (totalPages <= 5) {
      // small dataset
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // large dataset
      if (!showMore) {
        pages = [1, 2, 3, "...", totalPages];
      } else {
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        ];
      }
    }

    return pages.map((page, index) => {

      if (page === "...") {
        return (
          <button
            key={index}
            onClick={() => setShowMore(true)}
            className="px-3 py-1"
          >
            ...
          </button>
        );
      }

      return (
        <button
          key={index}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-purple-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="flex gap-2 mt-4">

      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="px-3 py-1 bg-gray-300 rounded"
      >
        Prev
      </button>

      {renderPages()}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="px-3 py-1 bg-gray-300 rounded"
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;