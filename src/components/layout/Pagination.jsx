const Pagination = ({ page, setPage }) => {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 text-sm border rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2 text-sm font-medium">{page}</span>

      <button
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 text-sm border rounded"
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;
