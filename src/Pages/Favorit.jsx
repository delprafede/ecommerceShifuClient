// import { Toaster, toast } from "sonner";
// import { iconoCarritoCart } from "../helpers/iconos";
import { useAuth } from "../Context/AuthContext";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFav } from "../Context/FavContext";
import { deleteIcons, iconoCarritoCart } from "../helpers/iconos";
import { useProducts } from "../Context/ProductsContext";
import { toast, Toaster } from "sonner";
import { formatCurrency } from "../utils";

const Favorit = () => {
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { favsPage, getProductsFavorite, deleteProductFavorites } = useFav();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    getProductsFavorite();
    if (!isAuthenticated) navigate("/");
  }, []);
  const alertas = () => {
    return toast.error("Eliminaste el producto de Mis Favoritos");
  };
  console.log(favsPage);
  const handleShop = async (favorite) => {
    await getProduct(favorite.product._id);
    navigate(`/productCard/${favorite.product._id}`);
  };
  const handDelete = (favorite) => {
    deleteProductFavorites(favorite.product._id);
    alertas();
  };
  return (
    <>
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

      <Toaster
        theme="light"
        position="top-center"
        duration={2500}
        richColors
        toastOptions={{
          style: {
            fontSize: "1rem",
            padding: "10px",
            borderRadius: "8px",
          },
          className: "myToast",
        }}
      />
    </>
  );
};

export default Favorit;
