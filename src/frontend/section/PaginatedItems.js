import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "next/navigation";

export default function PaginatedItems({ blogsPagination }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const currentPage = searchParams.get("page");

  const items = blogsPagination && blogsPagination?.map((item, index) => index);
  const itemsPerPage = 10;
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  function updateParams(page) {
    const params = new URLSearchParams({
      page: page,
    });
    router.push(`/blog/?${params.toString()}`);
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    updateParams(selectedPage);
  };

  return (
    <div className="pagination">
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        activeClassName="active-pagination"
        containerClassName="react-paginate"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
      />
    </div>
  );
}
