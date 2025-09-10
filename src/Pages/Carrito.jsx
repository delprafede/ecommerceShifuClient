import { useProducts } from "../Context/ProductsContext";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { PagoPay } from "../fetch/shopping";
import { useShoppingContext } from "../Context/ShoppingContext";
import "./CSS/PageProductCard.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { formatCurrency } from "../utils";
import spinnerLoading from "../assets/img/spinnerLoading.svg";
import ModalEditCarrito from "../Modal/ModalEditCarrito";
import {
  arrowIcons,
  arrowIconsUp,
  arrowRetuernIcons,
  deleteIcons,
} from "../helpers/iconos";

import SkeletonUi from "../Components/Skeleton";

export const Carrito = () => {
  initMercadoPago("APP_USR-ee7c2a9d-4725-4e64-bf91-ad5ba9a3c2a2", {
    locale: "es-AR",
  });
  //---
  const { user, isAuthenticated } = useAuth();
  const { createOrderPayment, payment, paymentId, spinnerCar, setSpinnerCar } =
    useShoppingContext();
  const {
    getProductShopping,
    productShopping,
    DeleteShoppingProduct,
    DecrementQty,
    getCarroId,
    deleteShopping,
  } = useProducts();

  const [spinner, setSpinner] = useState(false);
  // const [formapago, setForma] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getProductShopping();

    if (!isAuthenticated) navigate("/");
    setSpinnerCar(true);
  }, []);
  //  console.log(spinner); obtener info sobre la ejecucion repetida
  useEffect(() => {
    const timerPay = setTimeout(() => {
      setSpinner(false);
    }, 2000);

    return () => clearTimeout(timerPay);
  }, [spinner]);
  useEffect(() => {
    const timerSkeleton = setTimeout(() => {
      setSpinnerCar(false);
    }, 2000);

    return () => clearTimeout(timerSkeleton);
  }, [spinnerCar]);

  let Total = 0;
  for (let i = 0; i < productShopping.length; i++) {
    Total = Total + productShopping[i].cantidad * productShopping[i].pid.Precio;
  }

  const totalCompra = useMemo(
    () =>
      productShopping.reduce(
        (acum, element) => acum + element.cantidad * element.pid.Precio,
        0
      ),
    [productShopping]
  );

  //usar useMemo
  // let cantidadTotal = 0;
  // for (let i = 0; i < productShopping.length; i++) {
  //   cantidadTotal = +productShopping[i].cantidad;
  // }

  return (
    <>
      <div className=" d-flex flex-column justify-content-center">
        {spinnerCar ? (
          <div className="">
            <SkeletonUi />
          </div>
        ) : (
          <div className=" containerMax w-100 ">
            {productShopping.length === 0 ? (
              <div className="text-center mt-4">
                <h1 className=" text-center">
                  Aquí visualizarás tus productos
                </h1>

                <NavLink to={"/"} className="text-primary ms-2 fw-bold pointer">
                  {arrowRetuernIcons} volver al inicio
                </NavLink>
              </div>
            ) : (
              <div className="d-lg-flex justify-content-around ">
                <div className="d-flex flex-column col-lg-7 ">
                  {productShopping.map((item, index) => {
                    return (
                      <div key={index} className=" ">
                        <article>
                          <section className="container-md  rounded my-3 p-3 shadow-sm ">
                            <h2 className=" border-bottom border-2 pb-2 mb-0">
                              {item.pid.NombreProducto}
                            </h2>
                            <div className=" d-flex border-bottom border-2 py-3 ">
                              <figure className="card  m-0 col-4 cardImg">
                                <img
                                  className="card-img-top  "
                                  src={item.pid.UrlImagen[0].secure_url}
                                  alt=""
                                />
                              </figure>
                              <div className="col-6 d-flex flex-column justify-content-between p-1 p-lg-3">
                                <div className=" d-flex gap-2">
                                  <p className="fs-6 fw-bold ">
                                    Color:{" "}
                                    <span className=" d-inline fst-italic fw-medium fs-6">
                                      {item.eid.Color}
                                    </span>
                                  </p>
                                  <p className=" fw-bold fs-6 ">
                                    Talle:{" "}
                                    <span className=" d-inline fst-italic fs-6 fw-medium">
                                      {item.eid.Talle}
                                    </span>
                                  </p>
                                </div>
                                <button
                                  onClick={async () => {
                                    let eid = productShopping[index].eid._id;
                                    console.log(
                                      productShopping[index].pid.NombreProducto
                                    );
                                    console.log(eid);
                                    let IdUsu = user.id;
                                    let Product = { IdUsu, eid };

                                    await DeleteShoppingProduct(Product);
                                    DecrementQty();
                                  }}
                                  className=" border-0 text-primary bg-transparent m-0  w-50 text-start "
                                >
                                  eliminar
                                </button>
                                <button className="cardImg d-flex justify-content-around align-items-center border  rounded ">
                                  <span className="fs-6">
                                    {item.cantidad} u.
                                  </span>{" "}
                                  <span>
                                    <ModalEditCarrito element={item} />
                                  </span>
                                </button>
                              </div>
                              <div className="col d-flex justify-content-end align-items-end p-1">
                                <p className=" fs-5">
                                  {formatCurrency(item.pid.Precio)}
                                </p>
                              </div>
                            </div>
                          </section>
                        </article>
                      </div>
                    );
                  })}
                </div>
                <div className=" my-3  col-lg-4  d-flex justify-content-center p-1 rounded shadow-sm  p-lg-0 h-50">
                  <div className=" p-3 w-100  ">
                    <p className="  fw-semibold border-bottom p-2">
                      Resumen de compra
                    </p>

                    <div className="d-flex flex-column  gap-2 p-2">
                      <div className="d-flex justify-content-between">
                        <p>Producto</p>
                        <p>{formatCurrency(totalCompra)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Envio</p>
                        <p>{formatCurrency(0)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="fw-bold">Total</p>
                        <p className="fw-bold">{formatCurrency(totalCompra)}</p>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                      {spinner ? (
                        <img src={spinnerLoading} className="spinner" />
                      ) : (
                        <>
                          {paymentId ? (
                            <button
                              className="btn"
                              onClick={() => {
                                window.location.href = payment.data.init_point;
                              }}
                            >
                              <Wallet
                                className="bg-info"
                                initialization={{
                                  preferenceId: paymentId,
                                  redirectMode: "target_blank",
                                }}
                                customization={{
                                  texts: { valueProp: "smart_option" },
                                }}
                              />
                            </button>
                          ) : (
                            <Button
                              className="btn btn-primary w-100 mt-2"
                              onClick={async () => {
                                const carrito = {
                                  user: user.nameUser,
                                  userEmail: user.email,
                                  TotalCarro: Total,
                                };

                                createOrderPayment(carrito);
                                setSpinner(true);
                                // setTotal(Total)

                                // let PayShopping = {
                                //   cid: getCarroId,
                                //   TotalCarro: Total,
                                // };
                                // console.log(PayShopping);
                                // // console.log(payment);
                                // console.log(paymentId);

                                // const Pay = await PagoPay(PayShopping);

                                // console.log(Pay);
                                // deleteShopping(getCarroId);
                              }}
                            >
                              CONFIRMA COMPRA CARRITO
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

{
  /* <div>
            <h4>FORMA DE PAGO</h4>
            <Form.Select
              aria-label="Forma de Pago"
              onChange={(event) => {
                console.log(event.target.value);
                setForma(event.target.value);
              }}
            >
              <option disabled>Seleccione La Forma de Pago</option>
              <option value="Tarjeta Credito">Tarjeta Credito</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Mercado Pago">Mercado Pago</option>
            </Form.Select>
          </div> */
}
