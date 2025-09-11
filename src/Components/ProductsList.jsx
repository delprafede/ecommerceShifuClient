import { useState } from "react";
import Pagination from "./Pagination";

import { useProducts } from "../Context/ProductsContext";

import Products from "./Products";
import FilterProduct from "./FilterProduct";

const ProductsList = () => {
  const { productsPage, searchTrue } = useProducts();
  const [pageNumber, setPageNumber] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * pageNumber;
  const firstIndex = lastIndex - pageNumber;
  const totalProducts = productsPage.length;
  return (
    <>
      {searchTrue ? (
        <FilterProduct
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          setPageNumber={setPageNumber}
        />
      ) : (
        <Products
          firstIndex={firstIndex}
          lastIndex={lastIndex}
          setPageNumber={setPageNumber}
        />
      )}

      <div className={` w-100 p-3 ${searchTrue ? "d-none" : "d-block"}`}>
        <Pagination
          pageNumber={pageNumber}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={totalProducts}
        />
      </div>
    </>
  );
};

export default ProductsList;
