import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFav } from "../Context/FavContext";
import { toast, Toaster } from "sonner";
import Nav from "react-bootstrap/Nav";
import {  iconoFavorito, iconoFavoritoAgregado, iconstLeft } from "../helpers/iconos";

import { useProducts } from "../Context/ProductsContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { formatCurrency } from "../utils";
import { set } from "react-hook-form";

const FilterProduct = ({ lastIndex, firstIndex, setPageNumber }) => {
  const { user, isAuthenticated } = useAuth();
  const {
    favsPage,
    getProductsFavorite,
    deleteProductFavorites,
    createFavorite,
  } = useFav();

  const { getProducts, getProduct, search, setSearch, setSearcher, setSearchTrue } =
    useProducts();
  const [cambiar, setCambiar] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getProductsFavorite();
    getProducts();
  }, [cambiar]);

  const alertas = () => {
    return toast.warning("Debes iniciar sesion");
  };
  const alertasCreate = () => {
    return toast.success("Agregaste a favoritos");
  };
  const alertasDelete = () => {
    toast.error("Eliminaste de favoritos");
  };

  const handclick = (product) => {
    setCambiar((cambiar) => !cambiar);
    deleteProductFavorites(product._id);
    alertasDelete();
  };



  useEffect(() => {
    if (window.innerWidth <= 428) {
      setPageNumber(10);
    }

    window.addEventListener("resize", customWidth);
    return () => {
      window.removeEventListener("resize", customWidth);
    };
  }, [lastIndex]);
  const customWidth = () => {
    if (window.innerWidth >= 600) {
      setPageNumber(12);
    }
    if (window.innerWidth >= 992) {
      setPageNumber(15);
      // verificar
    }
    if (window.innerWidth <= 428) {
      setPageNumber(10);
      console.log("hola");
    }
  };
  console.log(search);
  return (
    <div className={`d-flex justify-content-center mt-3 h-100 containerMax `}>
      <div className=" d-flex  justify-content-center flex-wrap gap-2 gap-md-3 gap-xl-4 positionRelative ">
        {search.length > 0 ? (
          search
            .map((product, index) => {
              return (
                <div
                  key={index}
                  className="  card mb-4 boxShadow containerCard overflow-hidden "
                >
                  <div className="card  text-center">
                    <div className=" overflow-hidden  ">
                      <img
                        src={product.UrlImagen[0].secure_url}
                        className="  imgCard"
                        alt={product.NombreProducto}
                      />
                    </div>
                    <div
                      onClick={async () => {
                        await getProduct(product._id);
                        navigate(`/productCard/${product._id}`);
                      }}
                      className="card-body pointer"
                    >
                      <p className=" mb-0 fs-6 fontSize">
                        {product.NombreProducto.substring(0, 12)}...
                      </p>
                      <p className="card-text  fs-6 fontSize fw-bold">
                        {formatCurrency(product.Precio)}
                      </p>
                    </div>
                    {favsPage
                      .map((f) => f.product._id)
                      .includes(product._id) ? (
                      <button
                        key={product._id}
                        className=" btn  positionAbsolute"
                        type="submit"
                        onClick={() => {
                          handclick(product);
                        }}
                      >
                        {iconoFavoritoAgregado}
                      </button>
                    ) : (
                      <button
                        className="btn positionAbsolute"
                        type="submit"
                        key={product._id}
                        onClick={async () => {
                          if (!isAuthenticated) {
                            alertas();
                          } else {
                            const product1 = {
                              product: product._id,
                              user: user.id,
                            };

                            //  await createFavRequest(product1);
                            await createFavorite(product1);

                            alertasCreate();
                          }
                          // handclick();
                          setCambiar(!cambiar);
                        }}
                      >
                        {iconoFavorito}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
            .slice(firstIndex, lastIndex)
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center gap-2">
            <h2>No se encontraron productos</h2>
            <Nav.Link
              className="border p-1 rounded-1 bg-primary text-white"
              as={NavLink}
              to={"/"}
              onClick={() => {
                setSearcher([]);
                setSearchTrue(false);
              }}
            >
            {iconstLeft} Volver
           
            </Nav.Link>
          </div>
        )}
      </div>
      <Toaster theme="light" position="top-center" duration={2500} richColors />
    </div>
  );
};

export default FilterProduct;
