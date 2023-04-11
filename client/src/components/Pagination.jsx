import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
const Pagination = ({ data }) => {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;

    setItemOffset(newOffset);
  };

  return (
    <>
      <section className="shadow-lg md:w-4/5 mx-auto">
        <div className="flex flex-wrap md:flex-row justify-start gap-5 p-[10px]">
          {currentItems.map((data) => {
            return <ProductCard key={data._id} data={data} />;
          })}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="flex justify-center gap-2 md:gap-5 h-12 content-center text-xl"
          pageLinkClassName="page-num p-1 md:p-3"
          previousLinkClassName="page-num p-1 md:p-3"
          nextLinkClassName="page-num p-1 md:p-3"
          activeLinkClassName="active"
        />
      </section>
    </>
  );
};

export default Pagination;
