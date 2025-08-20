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
  const { favsPage, getProductsFavorite, deleteProductFavorites } = useFav();
  const { isAuthenticated } = useAuth();

  const alertas = () => {
    return toast.success("Eliminaste el producto de Mis Favoritos");
  };

  useEffect(() => {
    getProductsFavorite();
    if (!isAuthenticated) navigate("/");
  }, []);

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
                    <td className="">{cartFavoriteIcon}</td>

                    <td className=" ">{deleteIcons}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button className="btn btn-dark w-100 mt-3 p-2">
            Vaciar Favoritos
          </button>
        </>
      )}
    </>

    //           <div className="container-products">
    // {favsPage.map((favorite) => {
    //    return (
    //      <div className=" card-product bg-danger " key={favorite.product._id}>
    //        <figure className="container-img">
    //          <img
    //            className=""
    //            src={favorite.product.UrlImagen[0].secure_url}
    //            alt={favorite.product.NombreProducto}
    //          />

    //        </figure>

    //        <div className="info-product">
    //          <h3>{favorite.product.NombreProducto} </h3>
    //        </div>

    //        <div className="btnIcon bg-white ">
    //          <div className=" col-4 ">
    //            <p className="price text-danger ">
    //              $ {favorite.product.Precio}{" "}
    //            </p>
    //          </div>
    //          <div className=" d-flex col-8 justify-content-end g-3 ">

    //            <button
    //             className="bg-white"
    //                    onClick={async () => {
    //                      await getProduct(favorite.product._id);
    //                      navigate(`/productCard/${favorite.product._id}`);
    //                    }}
    //                  >
    //                   {iconoCarritoCart}
    //                  </button>
    //            <button
    //              className="text-primary bg-white "
    //              type="submit"
    //              onClick={() => {
    //                console.log(favorite.product._id);
    //                deleteProductFavorites(favorite.product._id);
    //                alertas();
    //              }}
    //            >
    //              Eliminar
    //            </button>
    //          </div>
    //        </div>
    //      </div>
    //        )
    //      <>

    //      </>
    //    )}
    //  </>
  );
};

export default Favorites;
//  <>
//    <h1 className=" text-center ">Favoritos</h1>
//    <div className="container-products">
//      {favsPage.map((favorite) => {
//        return (
//          <div className=" card-product bg-danger " key={favorite.product._id}>
//            <figure className="container-img">
//              <img
//                className=""
//                src={favorite.product.UrlImagen[0].secure_url}
//                alt={favorite.product.NombreProducto}
//              />

//            </figure>

//            <div className="info-product">
//              <h3>{favorite.product.NombreProducto} </h3>
//            </div>

//            <div className="btnIcon bg-white ">
//              <div className=" col-4 ">
//                <p className="price text-danger ">
//                  $ {favorite.product.Precio}{" "}
//                </p>
//              </div>
//              <div className=" d-flex col-8 justify-content-end g-3 ">

//                <button
//                 className="bg-white"
//                        onClick={async () => {
//                          await getProduct(favorite.product._id);
//                          navigate(`/productCard/${favorite.product._id}`);
//                        }}
//                      >
//                       {iconoCarritoCart}
//                      </button>
//                <button
//                  className="text-primary bg-white "
//                  type="submit"
//                  onClick={() => {
//                    console.log(favorite.product._id);
//                    deleteProductFavorites(favorite.product._id);
//                    alertas();
//                  }}
//                >
//                  Eliminar
//                </button>
//              </div>
//            </div>
//          </div>
//        );
//      })}
//    </div>
//    <Toaster
//      theme="light"
//      position="top-center"
//      duration={5000}
//      toastOptions={{
//        style: { background: "red" },
//        className: "my-toast",
//      }}
//    />
//  </>
//  {favsPage.length === 0 ? (favsPage.length=== 1 ? <p>Solo tienes un favorito</p> : <p>No tienes favoritos</p>) : (console.log("yo"))}
//  </>
