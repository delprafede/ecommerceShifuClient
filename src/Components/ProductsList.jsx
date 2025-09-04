import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFav } from "../Context/FavContext";
import { toast, Toaster } from "sonner";

import { iconoFavorito, iconoFavoritoAgregado } from "../helpers/iconos";

import { useProducts } from "../Context/ProductsContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { formatCurrency } from "../utils";
import { set } from "react-hook-form";
import Products from "./Products";
import FilterProduct from "./FilterProduct";

// import  Buscador  from "./Buscador";
// import { createFavRequest } from "../api/favorite";

const ProductsList = () => {
  const { search, productsPage, searchTrue } = useProducts();
  const [pageNumber, setPageNumber] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * pageNumber;
  const firstIndex = lastIndex - pageNumber;
  const totalProducts = productsPage.length;
 
  return (
    <>
   {searchTrue  ? (  <FilterProduct/>
     ): (<Products
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        setPageNumber={setPageNumber}
      />)}
     
        <div className={` w-100 p-3 ${searchTrue ? "d-none" : "d-block" }`}>
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
