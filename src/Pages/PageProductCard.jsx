import { useEffect, useMemo, useState } from "react";
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
import Publicidad from "../Components/Publicidad";
import SkeletonUi from "../Components/Skeleton";
import useLocalStorage from "../CustonHook/useLocalStorage";
import { use } from "react";

const PageProductCard = () => {
  const { productCard, getProduct, IncrementQty } = useProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  // const navigate = useNavigate();
  const [imgs, setImgs] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [spinnerColors, setSpinnerColors] = useState(true);
  const [spinnerCantidad, setSpinnerCantidad] = useState(false);
  const [talle, setTalle] = useState("");
  const [talleDuplicado, setTalleDuplicado] = useState([]);
  const [talleOk, setTalleOk] = useState(false);
  const [quantityMax, setQuantityMax] = useState([]);
  const [color, setColor] = useState("");
  const [arrayColors, setArrayColors] = useState([]);
  const [coloresparavender, setColoresparavender] = useState([]);
  const [cantidad, setCantidad] = useState(0);
  const [productLocal, setProductLocal] = useLocalStorage("productLocal", []);

  useEffect(() => {
    if (params.id) {
      getProduct(params.id);
    }
    const time = setTimeout(() => {
      setSpinner(false);
    }, 2500);
    // console.log()
    return () => clearTimeout(time);
  }, []);
  // console.log(productCard.Especificaciones)
  useEffect(() => {
    const timer = setTimeout(() => {
      setImgs(productCard.UrlImagen[0].secure_url);
      setArrayColors(productCard.Especificaciones.map((e) => e.id.Color));
      setTalleDuplicado(productCard.Especificaciones.map((e) => e.id.Talle));
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
      "Logueate por favor para ver tu carrito"
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
      IncrementQty();
      alertas();
      reset();
      const timer = setTimeout(() => {
        setTalle("");
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setProductLocal(data);
      IncrementQty();
      reset();
      alertasLocalStorageProduct();
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

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
  const handleTalle = (t) => {
    cambioIndexColor(t);
    console.log(t);
    setTalle(t);
  };
  let arrayColorsTalle = [];
  const cambioIndexColor = (t) => {
    setTalle(t);
    productCard.Especificaciones.find((e) => {
      if (e.id.Talle === t) {
        arrayColorsTalle.push(e.id.Color);
        setColoresparavender(arrayColorsTalle);
      }
    });
    setTalleOk(true);
    setSpinnerColors(true);
    const timerColor = setTimeout(() => {
      setSpinnerColors(false);
    }, 500);
    return () => clearTimeout(timerColor);
  };
  console.log(coloresparavender);

  // obtengo todos los talles sin repetirce y se muetra en la pagina
  let talleD = [...new Set(talleDuplicado)];

  // obtengo todos los colores sin repetirce y se muetra en la pagina
  const colorTotalProduct = [...new Set(arrayColors)];
  const handleQuantity = (e) => {
    setCantidad(e.target.value);
  };
  return (
    <>
      {spinner ? (
        <div className="container mt-3">
          <SkeletonUi />
        </div>
      ) : (
        <>
          <div className="container-lg d-lg-flex mt-lg-4 containerMax ">
            <div className=" container-fluid container-md col-lg-8   ">
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

            <div className=" container-fluid mt-2 mt-lg-0 col-lg-4  d-flex flex-column justify-content-center">
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
                <p>
                  Talle:{" "}
                  <span className=" d-inline fw-semibold">
                    {talle ? talle : " Elegi el talle"}
                  </span>
                </p>

                <div className="w-100 d-flex justify-content-start">
                  <div className=" d-flex gap-2 align-items-center">
                    {talleD.map((t, index) => {
                      return (
                        <div key={index} className="checketRadio ">
                          <input
                            type="radio"
                            id={index}
                            value={t}
                            className=" d-none "
                            {...register("talle", {
                              required: "Talle es requerido",
                            })}
                            onClick={() => {
                              handleTalle(t);
                            }}
                          />
                          <label className="cursor" htmlFor={index}>
                            {t} AR
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {errors.talle && (
                  <span className=" fs-4 text-start  text-danger ">
                    {errors.talle.message}
                  </span>
                )}

                {/* //colores */}

                <p>
                  Color:{" "}
                  <span className=" d-inline fw-semibold">
                    {color ? color : "Elegi el color"}
                  </span>
                </p>
                <div className="w-100 d-flex justify-content-start ">
                  <div className="d-flex gap-2 align-items-center flex-wrap">
                    {/* colores que tiene el producto */}
                    {talle ? (
                      spinnerColors ? (
                        <img src={spinnerLoading} className="spinner" />
                      ) : (
                        coloresparavender.map((c, index) => {
                          return (
                            <div
                              className=" d-flex justify-content-center align-items-center gap-2 checketRadio "
                              key={index}
                            >
                              <input
                                className=" d-none"
                                type="radio"
                                id={c}
                                value={c}
                                onClick={() => {
                                  quantityMaxCantidad(c);
                                  setColor(c);
                                }}
                                {...register("color", {
                                  required: "Color es requerido",
                                })}
                              />
                              <label className="cursor" htmlFor={c}>
                                {c}
                              </label>
                            </div>
                          );
                        })
                      )
                    ) : (
                      colorTotalProduct.map((ctp, index) => {
                        return (
                          <div
                            className=" d-flex justify-content-center align-items-center gap-2 opacity-50  "
                            key={index}
                          >
                            <input
                              className=" d-none opacity-50"
                              type="radio"
                              id={ctp}
                              value={ctp}
                              disabled
                            />
                            <label
                              className=" border rounded-1 border-2 p-1 text-nowrap"
                              htmlFor={ctp}
                            >
                              {ctp}
                            </label>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
                <div>
                  {errors.color && (
                    <span className=" fs-4 text-start mt-1  text-danger    ">
                      {errors.color.message}
                    </span>
                  )}
                </div>

                <div className=" w-100">
                  {talle && color ? (
                    <>
                      <p>
                        Cantidad:{" "}
                        <span className=" d-inline fw-semibold">
                          {cantidad}
                        </span>{" "}
                      </p>
                      {spinnerCantidad ? (
                        <img src={spinnerLoading} className="spinner" />
                      ) : (
                        <input
                          className="w-25"
                          type="number"
                          placeholder={
                            quantityMax === 0 ? "sin stock" : quantityMax
                          }
                          onChange={(e) => {
                            handleQuantity(e);
                          }}
                          min={1}
                          max={quantityMax}
                          {...register("cantidad", {
                            required: "Cantidad es requerida.",
                          })}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <span className="">
                        <p>
                          Cantidad:{" "}
                          <span className=" d-inline fw-semibold">0</span>
                        </p>
                      </span>
                      <input
                        className=" w-25 opacity-50"
                        type="number"
                        placeholder={cantidad}
                        disabled
                      />
                    </>
                  )}

                  {errors.cantidad && (
                    <span className=" fs-4 text-start mt-1  text-danger  ">
                      {errors.cantidad.message}
                    </span>
                  )}
                </div>

                <button
                  className="productDisplayRightTalleBtn w-100"
                  onClick={onSubmit}
                >
                  AGREAGAR AL CARRITO
                </button>
              </form>
            </div>
          </div>
          <div className=" container-lg containerMax mt-3 d-flex justify-content-around p-lg-5">
            <div className=" col-12 col-lg-6 p-2">
              <Comentarios productCard={productCard} />
            </div>
            <aside className=" d-none d-lg-flex col-lg-6">
              <Publicidad />
            </aside>
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
