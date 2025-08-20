import { useEffect, useState } from "react";
import { useProducts } from "../Context/ProductsContext";
import { set, useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import "./CSS/PageProductCard.css";
import { getEspecificaciones } from "../api/products";
import { PostShoppings } from "../fetch/shopping";
import { useNavigate, useParams } from "react-router-dom";
import spinnerLoading from "../assets/img/spinnerLoading.svg";
import { Toaster, toast } from "sonner";
import { Comentarios } from "../Components/Comentarios";

import SkeletonUi from "../Components/Skeleton";
import useLocalStorage from "../CustonHook/useLocalStorage";

const PageProductCard = () => {
  const { productCard, getProduct, IncrementQty } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  // const navigate = useNavigate();
  const [imgs, setImgs] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [spinnerColors, setSpinnerColors] = useState(true);
  const [spinnerCantidad, setSpinnerCantidad] = useState(false);
  const [talle, setTalle] = useState();
  const [talleDuplicado, setTalleDuplicado] = useState([]);
  const [talleOk, setTalleOk] = useState(false);
  const [quantityMax, setQuantityMax] = useState([]);
  const [color, setColor] = useState("");
  const [productLocal, setProductLocal] = useLocalStorage("productLocal", []);

  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
    }

    const time = setTimeout(() => {
      setSpinner(false);
    }, 2500);
    return () => clearTimeout(time);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImgs(productCard.UrlImagen[0].secure_url);
    }, 2000);
    return () => clearTimeout(timer);
  }, [productCard]);

  useEffect(() => {
    const timerColor = setTimeout(() => {
      setTalleOk(false);
      setSpinnerColors(false);
    }, 500);
    return () => clearTimeout(timerColor);
  }, [talle]);
  const alertas = () => {
    return toast.success("Se agrego a tu carrito");
  };
  const alertasLocalStorageProduct = () => {
    return toast.success(
      "Se agrego a tu carrito, logueate por favor para ver tu carrito"
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    data.IdProduct = productCard.IdProduct;
    if (user) {
      data.IdUsu = user.id;
    }
    data.talle = talle;
    const res = await getEspecificaciones(data);
    data.eid = res._id;
    if (isAuthenticated) {
      await PostShoppings(data);
      alertas();
      IncrementQty();
    } else {
      setProductLocal(data);
      IncrementQty();
      alertasLocalStorageProduct();
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  const cambioIndexColor = (colorIndex) => {
    setTalle(colorIndex);
    setTalleOk(true);
    setSpinnerColors(true);
    const timerColor = setTimeout(() => {
      setSpinnerColors(false);
    }, 500);
    return () => clearTimeout(timerColor);
  };

  const quantityMaxCantidad = (color) => {
    setColor(color);
    setSpinnerCantidad(true);

    productCard.Especificaciones.find((elem) => {
      if (elem.id.Color === color) {
        setQuantityMax(elem.id.Stock);
      }
    });
    const timerColor = setTimeout(() => {
      setSpinnerCantidad(false);
    }, 500);
    return () => clearTimeout(timerColor);
  };

  let talleD = [];
  let arrayColors = [];

  return (
    <>
      {spinner ? (
        <div className="container mt-3">
          <SkeletonUi />
        </div>
      ) : (
        <>
          <div
            className="container-lg d-lg-flex mt-lg-4 containerMax "
          >
            <div className=" container-fluid container-md col-lg-8  col-xl-9 ">
              <p className=" text-center my-3 d-lg-none fs-4">
                {productCard.NombreProducto}
              </p>
              <div className="d-flex flex-column align-items-center flex-md-row-reverse justify-content-around justify-content-lg-center gap-lg-3 mt-lg-3">
                <figure className="card cardImgTop">
                  <img src={imgs} className="card-img-top " alt={` ${imgs}`} />
                </figure>

                <div className="d-flex justify-content-center flex-md-column gap-2 gap-md-3">
                  {productCard.UrlImagen.map((img, index) => {
                    return (
                      <figure
                        onClick={() => {
                          setImgs(img.secure_url);
                        }}
                        key={index}
                        className="card cardImg m-0"
                      >
                        <img
                          className="card-img-top "
                          src={img.secure_url}
                          alt={`imagen ${index}`}
                        />
                      </figure>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className=" container-fluid mt-2 mt-lg-0 col-lg-4 col-xl-3 d-flex flex-column justify-content-center">
              <p className=" text-center d-none d-lg-flex fs-4">
                {productCard.NombreProducto}
              </p>
              <span className="productDisplayRightPriceLast">
                ${productCard.UltimoPrecio}
              </span>
              <span className="productDisplayRightPrice">
                ${productCard.Precio}
              </span>
              <p className="productDisplayRightDescription">
                {productCard.Detalle}
              </p>

              <form className=" w-100 d-flex align-items-start flex-column gap-2  mt-2">
                <h3>Talle</h3>

                <div className="w-100 d-flex justify-content-start">
                  {" "}
                  <select
                    className={` w-100 p-2 rounded-2  opacity-75 border-0  ${
                      errors.talle &&
                      "d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2 "
                    }`}
                    {...register("talle", {
                      required: "Talle es requerido",
                    })}
                  >
                    <option disabled selected value="">
                      ---Seleccione su talle---
                    </option>

                    {productCard.Especificaciones.map((t) => {
                      talleDuplicado.push(t.id.Talle);
                    })}
                    {(talleD = [...new Set(talleDuplicado)])}

                    {talleD.map((t) => {
                      return (
                        <option
                          onClick={() => {
                            cambioIndexColor(t);
                            setTalle(t);
                          }}
                          key={t.id}
                          value={t}
                        >
                          {t}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {errors.talle && (
                  <span className=" fs-4 text-start  text-danger ">
                    {errors.talle.message}
                  </span>
                )}

                <div className=" ">
                  {talle ? (
                    <h3>Color</h3>
                  ) : (
                    <span className=" fs-4 text-start  text-black ">
                      Seleccione un talle para ver los colores disponibles
                    </span>
                  )}
                  {spinnerColors ? (
                    <img src={spinnerLoading} className="spinner" />
                  ) : (
                    <>
                      <div className=" d-flex ">
                        <div
                          className={`d-flex bg-body-secondary w-100 gap-3 rounded-2 ${
                            arrayColors.length > 0 ? "p-2" : ""
                          }`}
                        >
                          {productCard.Especificaciones.find((e) => {
                            if (e.id.Talle === talle) {
                              arrayColors.push(e.id.Color);
                            }
                          })}
                          {arrayColors.map((e) => {
                            return (
                              <div
                                className=" d-flex justify-content-center align-items-center gap-2 p-2"
                                key={e}
                              >
                                <input
                                  type="radio"
                                  value={e}
                                  onClick={() => {
                                    quantityMaxCantidad(e);
                                  }}
                                  {...register("color", {
                                    required: "Color es requerido",
                                  })}
                                />
                                <label>{e}</label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        {errors.color && (
                          <span className=" fs-4 text-start mt-1  text-danger    ">
                            {errors.color.message}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className=" w-100">
                  {color ? (
                    <>
                      <h3 className="text-start">Cantidad</h3>
                      {spinnerCantidad ? (
                        <img src={spinnerLoading} className="spinner" />
                      ) : (
                        <input
                          className="w-100"
                          type="number"
                          placeholder={
                            quantityMax === 0 ? "sin stock" : quantityMax
                          }
                          min={1}
                          max={quantityMax}
                          {...register("cantidad", {
                            required: "Cantidad es requerida.",
                          })}
                        />
                      )}
                    </>
                  ) : (
                    <span className={` ${talle ? "d-flex" : "d-none"}`}>
                      Seleccione un color para ver la cantidad disponible
                    </span>
                  )}

                  {errors.cantidad && (
                    <span className=" fs-4 text-start mt-1  text-danger  ">
                      {errors.cantidad.message}
                    </span>
                  )}
                </div>

                <div className="productDisplayRightTalleBtn w-100 hover mt-2">
                  <btn onClick={onSubmit}>AGREAGAR AL CARRITO</btn>
                </div>
              </form>
            </div>
          </div>
          <div className=" container-lg containerMax mt-3 d-flex justify-content-around p-lg-5">
            <div className=" col-12 col-lg-6 p-2">
              <Comentarios productCard={productCard} />
            </div>
            <aside className="publicidadPageProduct d-none d-lg-flex col-lg-6"></aside>
          </div>
        </>
      )}
      <Toaster
        theme="light"
        position="top-center"
        duration={5000}
        toastOptions={{
          style: { background: "green" },
          className: "my-toast",
        }}
      />
    </>
  );
};

export default PageProductCard;
