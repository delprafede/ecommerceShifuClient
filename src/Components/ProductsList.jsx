import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { useFav } from "../Context/FavContext";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { iconoFavorito, iconoFavoritoAgregado } from "../helpers/iconos";
// import { createFavRequest } from "../api/favorite";
// import PaginaArticulo from "../Pages/ProductCard";
import { useProducts } from "../Context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { formatCurrency } from "../utils";

// import  Buscador  from "./Buscador";
// import { createFavRequest } from "../api/favorite";

const ProductsList = () => {
  const [pageNumber, setPageNumber] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { user, isAuthenticated } = useAuth();
  const {
    favsPage,
    getProductsFavorite,
    deleteProductFavorites,
    createFavorite,
  } = useFav();

  const { getProducts, productsPage, getProduct, search } = useProducts();
  const [cambiar, setCambiar] = useState(false);
  const navigate = useNavigate();
  const totalProducts = productsPage.length;

  const alertas = () => {
    return toast.success("Debes iniciar sesion");
  };
  const alertas1 = () => {
    return toast.success("Agregaste a favoritos");
  };

  const handclick = (product) => {
    setCambiar((cambiar) => !cambiar);
    deleteProductFavorites(product._id);
  };

  useEffect(() => {
    getProductsFavorite();
    getProducts();
  }, [cambiar]);
  const lastIndex = currentPage * pageNumber;
  const firstIndex = lastIndex - pageNumber;

  let filteredProducts = productsPage;
  if (search) {
    filteredProducts = productsPage.filter((product) =>
      product.NombreProducto.toLowerCase().includes(search.toLowerCase())
    );
  }

  const customWidth = () => {
    if (window.innerWidth >= 600) {
      setPageNumber(12);
    }
    if (window.innerWidth >= 1000) {
      setPageNumber(15);
    }
    if (window.innerWidth <= 428) {
      setPageNumber(10);
    }
  };
  useEffect(() => {
    customWidth();

    window.addEventListener("resize", customWidth);

    return () => {
      window.removeEventListener("resize", customWidth);
    };
  }, [lastIndex]);

  return (
    <>
      <div className={`d-flex justify-content-center mt-3 h-100 containerMax `}>
        <div className=" d-flex flex-wrap gap-2 gap-xl-3 justify-content-center ">
          {filteredProducts
            .map((product) => {
              return (
                <>
                  <div
                    key={product.id}
                    className="  card mb-4 boxShadow containerCard overflow-hidden"
                  >
                    <div
                      key={product.id}
                      className="card  text-center"
                    >
                      <div
                        onClick={async () => {
                          await getProduct(product._id);
                          navigate(`/productCard/${product._id}`);
                        }}
                        className=" overflow-hidden pointer "
                      >
                        <img
                          onClick={async () => {
                            await getProduct(product._id);
                            navigate(`/productCard/${product._id}`);
                          }}
                          src={product.UrlImagen[0].secure_url}
                          className="  imgCard"
                          alt={product.NombreProducto}
                        />
                      </div>
                      <div className="card-body">
                        <p className=" mb-0 fs-6 fontSize">
                          {product.NombreProducto.substring(0, 12)}...
                        </p>
                        <p className="card-text  fs-6 fontSize fw-bold">
                          {formatCurrency(product.Precio)}
                        </p>
                        <div className="d-flex justify-content-around align-items-center">
                          <a
                            className="d-none d-lg-block  linkHover"
                            onClick={async () => {
                              await getProduct(product._id);
                              navigate(`/productCard/${product._id}`);
                            }}
                          >
                            Ver más
                          </a>

                          {favsPage
                            .map((f) => f.product._id)
                            .includes(product._id) ? (
                            <button
                              key={product._id}
                              className=" btn CorazonRed"
                              type="submit"
                              onClick={() => {
                                handclick(product);
                              }}
                            >
                              {iconoFavoritoAgregado}
                            </button>
                          ) : (
                            <button
                              className="btn "
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

                                  alertas1();
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
                    </div>
                  </div>
                </>
              );
            })
            .slice(firstIndex, lastIndex)}
        </div>
      </div>

      {!search ? (
        <div className=" w-100 p-3">
          <Pagination
            pageNumber={pageNumber}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalProducts={totalProducts}
          />
        </div>
      ) : null}

      <Toaster
        theme="light"
        position="top-center"
        duration={2000}
        toastOptions={{
          style: { background: "green" },
          className: "myToast",
        }}
      />
    </>
  );
};

export default ProductsList;
