import { useEffect } from "react";

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

const Favorites = () => {
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { favsPage, deleteProductFavorites, clearFavorites } = useFav();
  const { isAuthenticated } = useAuth();

  const alertas = () => {
    return toast.error("Eliminaste el producto de Mis Favoritos");
  };

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
                        handleShop(favorito);
                      }}
                      className=""
                    >
                      {cartFavoriteIcon}
                    </td>

                    <td
                      onClick={() => {
                        handDelete(favorito);
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
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
          />
          </>
      )}
    </>
  );
};

export default Favorites;
