import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils";
import { iconoFavorito, iconoFavoritoAgregado } from "../helpers/iconos";
import { useEffect, useState } from "react";
import { useProducts } from "../Context/ProductsContext";
import { useAuth } from "../Context/AuthContext";
import { useFav } from "../Context/FavContext";
import { toast, Toaster } from "sonner";

const Categories = (categories) => {
  const { user, isAuthenticated } = useAuth();
  const [cambiar, setCambiar] = useState(false);
  const { getProducts, productsPage, getProduct } = useProducts();
  const {
    favsPage,
    getProductsFavorite,
    deleteProductFavorites,
    createFavorite,
  } = useFav();
  const navigate = useNavigate();

  const handclick = (product) => {
    setCambiar((cambiar) => !cambiar);
    deleteProductFavorites(product._id);
  };
  const alertas = () => {
    return toast.error("Debes iniciar sesion");
  };
  const alertas1 = () => {
    return toast.success("Agregaste a favoritos");
  };

  useEffect(() => {
    getProductsFavorite();
    getProducts();
  }, [cambiar]);

  return (
    <>
      <h2 className=" text-center fw-semibold fs-2 my-3">
        Categorias {categories.category}
      </h2>
      <div className=" d-flex justify-content-center container-products mt-4 h-100 containerMax m-auto">
        <div className=" d-flex flex-wrap gap-3 justify-content-center">
          {productsPage.map((product) => {
            if (product.Categoria === categories.category)
              return (
                <>
                  <div
                    key={product.id}
                    className=" card mb-4 boxShadow containerCard overflow-hidden"
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
                </>
              );
          })}
        </div>

        <Toaster
          theme="light"
          position="top-center"
          duration={2000}
          richColorspor
         
        />
      </div>
    </>
  );
};

export default Categories;
