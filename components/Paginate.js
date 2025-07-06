const Paginate = ({
  totalPosts,
  postPerPage,
  currentPage,
  nextpage,
  prevpage,
}) => {
  const totalPages = Math.ceil(totalPosts / postPerPage);

  return (
    <nav className="flex items-center justify-center gap-4 my-8">
      <button
        onClick={(e) => {
          e.preventDefault();
          prevpage(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#0070ae] text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95'
        }`}
      >
        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="px-4 py-2 bg-white rounded-lg shadow-md border-2 border-[#0070ae] text-[#0070ae] font-semibold">
          {currentPage}
        </span>
        <span className="text-gray-500">of</span>
        <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-semibold">
          {totalPages}
        </span>
      </div>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          nextpage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#0070ae] text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95'
        }`}
      >
        Next
        <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

export default Paginate;
