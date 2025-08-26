import { useEffect, useState } from "react";

import { useFav } from "../Context/FavContext";

import { Toaster, toast } from "sonner";
import {
  cartFavoriteIcon,
  deleteIcons,
  iconoCarritoCart,
} from "../helpers/iconos";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductsContext";
import { formatCurrency } from "../utils";

const Favorites = () => {
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { favsPage, deleteProductFavorites, clearFavorites } = useFav();
  const { isAuthenticated } = useAuth();
  const [windowWidth, setWindowWidth] = useState(false);

  const alertas = () => {
    return toast.error("Eliminaste de Mis Favoritos modal");
  };

  const handleShop = async (favorite) => {
    await getProduct(favorite);

    navigate(`/productCard/${favorite}`);
  };
  const handDelete = (favorite) => {
    deleteProductFavorites(favorite);
    alertas();
  };

  const handleClear = () => {
    clearFavorites();
    toast.success("Se vaciaron los favoritos");
  };
  const windowPage = () => {
    if (window.innerWidth > 1000) {
      setWindowWidth(true);
      console.log("cambiando");
      navigate("/");
      return;
    }
  };
  console.log(windowWidth);

  useEffect(() => {
    window.addEventListener("resize", windowPage);
    return () => {
      window.removeEventListener("resize", windowPage);
    };
  }, []);
  return (
    <>
      {windowWidth ? (
        // pantalla  grande volver
        <div>
          {" "}
           {favsPage.length > 0 && (
            <>
              <table className="w-100 table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Comprar</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className=" align-middle text-center">
                  {favsPage.map((favorito) => {
                    return (
                      <tr key={favorito.product._id}>
                        <td>
                          <img
                            className="img-fluid"
                            src={favorito.product.UrlImagen[0].secure_url}
                            alt={favorito.product.NombreProducto}
                          />
                        </td>
                        <td>
                          {favorito.product.NombreProducto.substring(0, 10)}...
                        </td>
                        <td className="fw-bold">${favorito.product.Precio}</td>
                        <td
                          onClick={() => {
                            handleShop(favorito.product._id);
                          }}
                          className=""
                        >
                          {cartFavoriteIcon}
                        </td>

                        <td
                          onClick={() => {
                            handDelete(favorito.product._id);
                          }}
                          className=" "
                        >
                          {deleteIcons}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <button
                onClick={() => {
                  clearFavorites();
                }}
                className="btn btn-dark w-100 mt-3 p-2"
              >
                Vaciar Favoritos
              </button>
              <Toaster
                position="bottom-right"
                richColors
                toastOptions={{
                  duration: 5000,
                }}
              />
            </>
          )}
        </div>
      ) : (
        // modal
        <div>
          {" "}
           {favsPage.length === 0 ? (
        <>
          <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1 className=" text-uppercase text-center my-3">
              Tus favoritos se mostrarán aquí
            </h1>
            <button className="btn btn-primary " onClick={() => navigate("/")}>
              Volver
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className=" text-center ">Favoritos</h1>
          <div className="d-flex justify-content-center mt-3 containerMax">
            <div className=" d-flex  justify-content-center flex-wrap gap-2 gap-md-3 gap-xl-4 positionRelative ">
              {favsPage.map((favorite, index) => {
                return (
                  <div
                    key={index}
                    className="  card mb-4 boxShadow containerCard overflow-hidden "
                  >
                    <div className="card  text-center">
                      <div className=" overflow-hidden  ">
                        <img
                          src={favorite.product.UrlImagen[0].secure_url}
                          className="  imgCard"
                          alt={favorite.product.NombreProducto}
                        />
                      </div>
                      <div
                        onClick={() => {
                          handleShop(favorite);
                        }}
                        className="card-body pointer"
                      >
                        <p className=" mb-0 fs-6 fontSize">
                          {favorite.product.NombreProducto.substring(0, 12)}...
                        </p>
                        <p className="card-text  fs-6 fontSize fw-bold">
                          {formatCurrency(favorite.product.Precio)}
                        </p>
                      </div>

                      <button
                        className="btn positionAbsolute"
                        type="submit"
                        key={favorite.product._id}
                        onClick={() => {
                          handDelete(favorite);
                        }}
                      >
                        {deleteIcons}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
        </div>
      )}
    </>
  );
};

export default Favorites;
