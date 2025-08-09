import {
  arrowIcons,
  arrowRetuernIcons,
  bagIcons,
  questionIcon,
} from "../helpers/iconos";
import { NavLink } from "react-router-dom";

const Ayuda = () => {
  return (
    <div className="container-fluid container-lg  p-1 mt-5 mb-5">
      <h1 className=" fw-semibold ">¿Cómo podemos ayudarte?</h1>
      <div>
        <p className=" fs-3 fw-bold mt-3 mb-3 mt-4">Compras</p>

        <div className="p-2 d-flex align-items-center bg-body-secondary  border rounded-2 ">
          <p className="col-1 text-center">
            <i className="bi bi-bag ">{bagIcons}</i>
          </p>

          <div
            className="d-flex  flex-column justify-content-center p-1 col-10
          "
          >
            <p className=" fw-semibold">Administrar y cancelar compras</p>
            <p className="text-muted">
              Pagar, seguir envíos, modificar, cancelar o devolver compras, y
              más.
            </p>
          </div>

          <div
            className="col-1
             text-center pointer
           "
          >
            <i className="bi bi-arrow-right-circle-fill ">{arrowIcons}</i>
          </div>
        </div>
        <div className="p-2 d-flex align-items-center bg-body-secondary  border rounded-2 ">
          <p className="col-1 text-center">
            <i className="bi bi-bag">{arrowRetuernIcons}</i>
          </p>

          <div
            className="d-flex  flex-column justify-content-center p-1 col-10
          "
          >
            <p className=" fw-semibold">Devoluciones y reembolsos</p>

            <p className="text-muted">
              Devovler un producto, solicitar un reembolso o cambiar un
              producto.
            </p>
          </div>

          <div
            className="col-1
             text-center pointer
           "
          >
            <i className="bi bi-arrow-right-circle-fill ">{arrowIcons}</i>
          </div>
        </div>
        <div className="p-2 d-flex align-items-center bg-body-secondary  border rounded-2 ">
          <p className="col-1 text-center">
            <i className="bi bi-bag">{questionIcon}</i>
          </p>

          <div
            className="d-flex  flex-column justify-content-center p-1 col-10
          "
          >
            <p className=" fw-semibold">Preguntas frecuentes</p>
          </div>
          <div
            className="col-1
             text-center pointer
           "
          >
            <i className="bi bi-arrow-right-circle-fill ">{arrowIcons}</i>
          </div>
        </div>
      </div>
      <div>
        <p className=" fs-3 fw-bold mt-3 mb-3 mt-4">Ventas</p>
        <div className="p-2 d-flex align-items-center bg-body-secondary  border rounded-2 ">
          <p className="col-1 text-center ">
            <i className="bi bi-bag ">{bagIcons}</i>
          </p>

          <div
            className="d-flex  flex-column justify-content-center p-1 col-10
          "
          >
            <p className=" fw-semibold">Gestionar ventas</p>

            <p className="text-muted">Ventas, cobros, envíos y más.</p>
          </div>

          <div
            className="col-1
             text-center pointer
           "
          >
            <i className="bi bi-arrow-right-circle-fill ">{arrowIcons}</i>
          </div>
        </div>
        <div className="p-2 d-flex align-items-center bg-body-secondary  border rounded-2 ">
          <p className="col-1 text-center pointer">
            <i className="bi bi-bag">{questionIcon}</i>
          </p>

          <div
            className="d-flex  flex-column justify-content-center p-1 col-10
          "
          >
            <p className=" fw-semibold">Preguntas frecuentes</p>
          </div>
          <div
            className="col-1
             text-center pointer
           "
          >
            <i className="bi bi-arrow-right-circle-fill ">{arrowIcons}</i>
          </div>
        </div>
      </div>
      <div className="d-flex gap-2 mt-4">
        <p className="fw-bold ">Necesitas más ayuda</p>
        <NavLink to={"/contacto"} className=" linkHover fst-italic fw-bold ">
          Ir a Contacto
        </NavLink>
      </div>
    </div>
  );
};
export default Ayuda;
