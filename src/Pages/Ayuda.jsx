import { arrowIcons, arrowRetuernIcons, bagIcons, questionIcon } from "../helpers/iconos";
import { NavLink } from "react-router-dom";



const Ayuda = () => {
  return (
    <div className="container-fluid container-lg  p-1 mt-5 mb-5">
      <h2 className=" fw-semibold ">¿Cómo podemos ayudarte?</h2>
      <div>
        <p className="fw-bold mt-3 mb-3 mt-4">Compras</p>
        <div className="">
          <div className=" p-3 d-flex justify-content-between bg-body-secondary  border rounded-2 align-items-center">
            <div className="">
              <div className="d-flex align-items-center gap-2">
                <p>
                  <i className="bi bi-bag">{bagIcons}</i>
                </p>
              <p className=" fw-semibold">Administrar y cancelar compras</p>
              </div>
              <p className="text-muted ms-4">
                Pagar, seguir envíos, modificar, cancelar o devolver compras, y
                más.
              </p>
            </div>
            <div className=" ">
              <i className="bi bi-arrow-right-circle-fill">{arrowIcons}</i>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" p-3 d-flex justify-content-between bg-body-secondary  border rounded-2 align-items-center">
            <div className="">
              <div className="d-flex align-items-center gap-2">
                <p>
                  <i className="bi bi-bag">{arrowRetuernIcons}</i>
                </p>
              <p className=" fw-semibold">Devoluciones y reembolsos</p>
              </div>
              <p className="text-muted ms-4">
                Devovler un producto, solicitar un reembolso o cambiar un
                producto.
              </p>
            </div>
            <div className=" ">
              <i className="bi bi-arrow-right-circle-fill">{arrowIcons}</i>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" mb-3 p-3 d-flex justify-content-between bg-body-secondary  border rounded-2 align-items-center">
            <div className="">
              <div className="d-flex align-items-center gap-2">
                <p>
                  <i className="bi bi-bag">{questionIcon}</i>
                </p>
              <p className=" fw-semibold">Preguntas frecuentes</p>
              </div>
             
            </div>
            <div className=" ">
              <i className="bi bi-arrow-right-circle-fill">{arrowIcons}</i>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="fw-bold mt-3 mb-3 mt-4">Ventas</p>
        <div className="">
          <div className=" p-3 d-flex justify-content-between bg-body-secondary  border rounded-2 align-items-center">
            <div className="">
              <div className="d-flex align-items-center gap-2">
                <p>
                  <i className="bi bi-bag">{bagIcons}</i>
                </p>
              <p className=" fw-semibold">Gestionar ventas</p>
              </div>
              <p className="text-muted ms-4">
                Ventas, cobros, envíos y más.
              </p>
            </div>
            <div className=" ">
              <i className="bi bi-arrow-right-circle-fill">{arrowIcons}</i>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" p-3 d-flex justify-content-between bg-body-secondary  border rounded-2 align-items-center">
            <div className="">
               <div className="d-flex align-items-center gap-2">
                <p>
                  <i className="bi bi-bag">{questionIcon}</i>
                </p>
              <p className=" fw-semibold">Preguntas frecuentes</p>
              </div>
             
            </div>
            <div className=" ">
              <i className="bi bi-arrow-right-circle-fill">{arrowIcons}</i>
            </div>
          </div>
        </div>
      
        
      </div>
      <div>
        <p className="fw-bold mt-3 mb-3 mt-4">Necesitas más ayuda</p>
        <NavLink to={"/contacto"} className="text-decoration-none text-bg-info p-2 rounded-2">
         Ir a Contacto
        </NavLink>
       
      
        
      </div>
    </div>
  );
};
export default Ayuda;
