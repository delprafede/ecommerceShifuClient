import { createContext, useContext, useState } from "react";
import {
  getProductsRequest,
  getProductCardRequest,
  getProductsShoppingRequest,
  deleteShoppingRequest,
  getComentriesRequest,
  createComentriesRequest,
} from "../api/products.js";

import { useAuth } from "./AuthContext";

const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context)
    throw new Error("useProducts debe utilizarse dentro del ProductsProvider");
  return context;
};
// eslint-disable-next-line react/prop-types
export const ProductsProvider = ({ children }) => {
  const [productsPage, setProductsPage] = useState([]);
  const [getCarroId, setGetCarroId] = useState("");
  const [productCard, setProductCard] = useState();

  const [cantidad, setCantProduct] = useState();
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchTrue, setSearchTrue] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState("");
  const [comentries, setComentries] = useState([]);
  const [isProductLocal, setIsProductLocal] = useState("");
  const { user, isAuthenticated } = useAuth();

  //BUSCADOR
  const searcher = (name) => {
    setSearch(
      productsPage.filter((product) => {
        if (product.NombreProducto.toLowerCase().includes(name.toLowerCase())) {
          return product;
        }
      })
    );
    setSearchTrue(true);
  };
  //CONTROLA EL LOCALSTORAGE DEL CARRITO
  const productStorage = async (user, productLocal) => {
    console.log(user, productLocal);
    if (Object.keys(productLocal).length > 0 && user) {
      const { IdProduct, cantidad, color, eid } = productLocal;
      const IdUsuProductStorage = {
        IdUsu: user.id,
        IdProduct,
        cantidad,
        color,
        eid,
      };

      const res = await PostShoppings(IdUsuProductStorage);
      setIsProductLocal(res.status);
      console.log("enviando");
      const timer = setTimeout(() => {
        localStorage.removeItem("productLocal");
        return () => clearTimeout(timer);
      }, 2000);
    }
  };
  //OBTIENE TODOS LOS PRODUCTOS
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProductsPage(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //OBTIENE UN PRODUCTO
  const getProduct = async (id) => {
    try {
      const res = await getProductCardRequest(id);
      setProductCard(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // TRAER TODOS LOS PRODUCTOS DEL CARRRITO



  const CreateComentries = async (comentrie) => {
    try {
      const res = await createComentriesRequest(comentrie);
    } catch (error) {
      console.log(error);
    }
  };
  const getComentries = async (id) => {
    try {
      const res = await getComentriesRequest(id);
      console.log(res);

      setComentries(res);
    } catch (error) {
      console.log(error, "no me estoy aplicando");
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        search,
        searcher,
        setSearch,
        results,
        setResults,
        getProducts,
        getProduct,
        productsPage,
        setProductsPage,
        getCarroId,
        productCard,
        cantidad,
        setCantProduct,
    
        CreateComentries,
        getComentries,
        comentries,
        filteredProduct,
        setSearchTrue,
        searchTrue,
        productStorage,
        setIsProductLocal,
        isProductLocal,
  
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
