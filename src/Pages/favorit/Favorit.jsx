// import { Toaster, toast } from "sonner";
// import { iconoCarritoCart } from "../helpers/iconos";
import { useAuth } from "../../Context/AuthContext";
import "./favorite.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFav } from "../../Context/FavContext";
import { iconoCarritoCart } from "../../helpers/iconos";
import { useProducts } from "../../Context/ProductsContext";
import { toast, Toaster } from "sonner";

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
    return toast.success("Eliminaste el producto de Mis Favoritos");
  };
  console.log(favsPage);

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
          {/* {favsPage.map((favorite) => {
            return (
              <div
                key={favorite.product._id}
                className="  card mb-4 boxShadow containerCard overflow-hidden "
              >
                <div key={favorite.product._id} className="card  text-center">
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
                  {favsPage.map((f) => f.product._id).includes(product._id) ? (
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
          })} */}
          {/* <div className="container-products">
            {favsPage.map((favorite) => {
              return (
                <div
                  className=" card-product bg-danger "
                  key={favorite.product._id}
                >
                  <figure className="container-img">
                    <img
                      className=""
                      src={favorite.product.UrlImagen[0].secure_url}
                      alt={favorite.product.NombreProducto}
                    />
                  </figure>

                  <div className="info-product">
                    <h3>{favorite.product.NombreProducto} </h3>
                  </div>

                  <div className="btnIcon bg-white ">
                    <div className=" col-4 ">
                      <p className="price text-danger ">
                        $ {favorite.product.Precio}{" "}
                      </p>
                    </div>
                    <div className=" d-flex col-8 justify-content-end g-3 ">
                      <button
                        className="bg-white"
                        onClick={async () => {
                          await getProduct(favorite.product._id);
                          navigate(`/productCard/${favorite.product._id}`);
                        }}
                      >
                        {iconoCarritoCart}
                      </button>
                      <button
                        className="text-primary bg-white "
                        type="submit"
                        onClick={() => {
                          console.log(favorite.product._id);
                          deleteProductFavorites(favorite.product._id);
                          alertas();
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </>
      )}
      <Toaster
        theme="light"
        position="top-center"
        duration={2500}
        richColors
        toastOptions={{
          style: {
            fontSize: "1.2rem",
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
