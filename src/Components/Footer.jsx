import { NavLink, useNavigate } from "react-router-dom";
// import logoAdidas from "../assets/img/logoAdidas.png";
import logoshifu from "../assets/img/logoshifu.png";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import iconos from "../helpers/iconos";
import QRCode from "react-qr-code";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="  d-md-flex justify-content-around p-2 p-lg-4 p-md-3  ">
        <div className=" d-flex justify-content-center ">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logofooter  "
          ></div>
        </div>

        <div className="  d-flex flex-column align-items-center  ">
          <h4 className=" text-uppercase text-dark text-center fw-semibold">
            Productos
          </h4>
          <ul className=" d-flex  flex-column  align-items-center p-0">
            <li>
              {" "}
              <NavLink>About us</NavLink>
            </li>
            <li>
              {" "}
              <NavLink>About us</NavLink>
            </li>
          </ul>
        </div>
        <div className=" d-flex flex-column align-items-center ">
          <h4 className=" text-uppercase text-dark text-center fw-semibold">
            Productos
          </h4>
          <ul className=" d-flex  flex-column justify-content-center align-items-center p-0">
            <li>
              {" "}
              <NavLink>About us</NavLink>
            </li>
            <li>
              {" "}
              <NavLink>About us</NavLink>
            </li>
          </ul>
        </div>
        <div className="  d-flex flex-column justify-content-center align-items-center ">
          <h4 className=" text-uppercase text-dark text-center fw-semibold">
            Siguenos
          </h4>
          <div className="d-flex  flex-column justify-content-center align-items-center p-0 gap-3">
            <ul
              className=" d-flex mt-0 mb-0 ps-0 justify-content-center gap-3 justify-content-lg-around
           "
            >
              {iconos.map((i) => {
                return <li key={i.idSvg}>{i.svg}</li>;
              })}
            </ul>

            <div>
              {" "}
              <QRCode
                size={256}
                style={{ height: "100px", width: "100px" }}
                value="www.google.com"
                viewBox={`0 0 100 100`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col bg-body-secondary text-dark p-2 text-center mt-2">
        <p>Copyright Todos los Derechos Reservados - Grupo Shifu</p>
      </div>
    </>
  );
};

export default Footer;
