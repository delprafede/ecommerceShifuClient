import { createContext, useContext, useState } from "react";
import {
  getProductsRequest,
  getProductCardRequest,
  getProductsShoppingRequest,
  deleteShoppingRequest,
  getComentriesRequest,
  createComentriesRequest,
} from "../api/products";
import { DeleteProduct, PostShoppings } from "../fetch/shopping";
import { set } from "react-hook-form";

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
  const [productShopping, setProductShopping] = useState([]);
  const [quantity, setQuantity] = useState(productShopping.length);
  const [cantidad, setCantProduct] = useState();
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchTrue, setSearchTrue] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState("");
  const [comentries, setComentries] = useState([]);

  const DecrementQty = () => {
    if (productShopping.length > 0) {
      setQuantity((prevCont) => prevCont - 1);
    }
  };

  const IncrementQty = () => {
    setQuantity((prevCont) => prevCont + 1);
  };
  const searcher = (name) => {
   
   setSearch(productsPage.filter((product) =>
      product.NombreProducto.toLowerCase().includes(name.toLowerCase())))
    setSearchTrue(true)
    // if ( filteredProduct  ) {

    //   filteredProduct = productsPage.filter((product) =>
    //     product.NombreProducto.toLowerCase().includes(
    //       name.toLowerCase()
    //     ))
    //   }else {
    //  console.log(   "no esoty")
    //   }
      
 
  }
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProductsPage(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductCardRequest(id);
      setProductCard(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // TRAER TODOS LOS PRODUCTOS DEL CARRRITO
  const getProductShopping = async () => {
    try {
      const res = await getProductsShoppingRequest();

      setProductShopping(res.data.DetalleCarro);

      setGetCarroId(res.data._id);
    } catch (error) {
      console.log(error.response);
    }
  };
  // ELIMINA PRODUCTOS DEL CARRITO
  const DeleteShoppingProduct = async (Product) => {
    try {
      const res = await DeleteProduct(Product);
      console.log(res.data);

      if (res.status === "ok")
        setProductShopping(
          productShopping.filter((shopping) => shopping.eid._id !== Product.eid)
        );
    } catch (error) {
      console.log(error);
    }
  };

  // ELIMINA EL CARRITO DEL USUAERIO
  const deleteShopping = async (id) => {
    try {
      const res = await deleteShoppingRequest(id);
      console.log(res);
      if (res.status === 204) setProductShopping([]);
    } catch (error) {
      console.log(error);
    }
  };
  const ModificarCantidadShopinng = async (Product) => {
    try {
      const res = await PostShoppings(Product);
      console.log(res);

      if (res.status === "ok") setProductShopping(res.data.DetalleCarro);
    } catch (error) {
      console.log(error, "no me estoy aplicando");
    }
  };

  const CreateComentries = async (comentrie) => {
    const res = await createComentriesRequest(comentrie);
    console.log(res);
  };
  const getComentries = async (id) => {
    try {
      const res = await getComentriesRequest(id);

      setComentries(res);
    } catch (error) {
      console.log(error, "no me estoy aplicando");
    }
  };

  // porducto = porductoss
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
        getProductShopping,
        productsPage,
        setProductsPage,
        productShopping,
        getCarroId,
        productCard,
        DeleteShoppingProduct,
        deleteShopping,
        quantity,
        DecrementQty,
        IncrementQty,
        cantidad,
        setCantProduct,
        ModificarCantidadShopinng,
        CreateComentries,
        getComentries,
        comentries,
        filteredProduct,
       setSearchTrue,
       searchTrue
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
