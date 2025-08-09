import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
// import Form from "react-bootstrap/Form";
// import LogoYoCampo from "../assets/img/LogoYoCampo.jpg";
// import logoAdidas from "../assets/img/logoAdidas.png";
import logoshifu from "../assets/img/logoshifu.png";
import { Button } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import iconos, {
  iconoCarrito,
  iconoFavorito,
  locationIcons,
  personIcon,
} from "../helpers/iconos";
import { useAuth } from "../Context/AuthContext";
import { useProducts } from "../Context/ProductsContext";
import { useEffect } from "react";
import Buscador from "./Buscador";
import { useFav } from "../Context/FavContext";
import Categories from "./Categories";
// import PaginaLoguin from "../Pages/PaginaLoguin";

function NavBarEx() {
  const { isAuthenticated, logout, user } = useAuth();
  const { productShopping, getProductShopping, quantity, search, setSearch } =
    useProducts();
  const { favsPage, getProductsFavorite } = useFav();

  // const [show, setShow] = useState(false);
  const categories = [
    { id: 1, name: "Hombres" },
    { id: 2, name: "Mujeres" },
    { id: 3, name: "Niños" },
  ];

  useEffect(() => {
    getProductShopping();
    getProductsFavorite();
  }, [quantity, isAuthenticated]);

  // console.log(productsPage);

  return (
    <>
      <Navbar expand="lg" className=" bg-body-secondary p-2">
        <Container className="  d-flex justify-content-center  flex-lg-column  ">
          <Navbar className="col col-lg-12 order-2 order-lg-0 ">
            <Container className="d-flex justify-content-center  p-2 ">
              <Nav.Link
                onClick={() => {
                  setSearch("");
                }}
                as={NavLink}
                to="/"
                className="col-lg-3 d-flex justify-content-lg-start justify-content-center"
              >
                <div className="logo"></div>
                {/* div logo */}
              </Nav.Link>

              <div className=" col-lg-6 d-none d-lg-block order-lg-0">
                <Buscador buscar={search} />
              </div>
              <div className="d-none d-lg-flex col-lg-3 justify-content-end mt-0">
                <ul className=" d-flex gap-3">
                  {iconos.map((s) => {
                    return <li key={s.idSvg}>{s.svg}</li>;
                  })}
                </ul>
              </div>
            </Container>
          </Navbar>

          {/* moviles */}
          <NavDropdown
            title={personIcon}
            id="basic-nav-dropdown"
            className="order-3 d-lg-none "
          >
            {isAuthenticated && user.rule === "admin" ? (
              <div>
                <btn
                  className=" p-3 pointer"
                  onClick={() => {
                    logout();
                  }}
                >
                  Salir
                </btn>
              </div>
            ) : isAuthenticated ? (
              <>
                <NavDropdown title={user.nameUser} id="basic-nav-dropdown">
                  <btn
                    className=" p-3 pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Salir
                  </btn>
                </NavDropdown>
              </>
            ) : (
              <>
                <ul className=" mb-0 ps-2">
                  <li>
                    <Nav.Link as={NavLink} to="registro">
                      Registro
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link as={NavLink} to="login">
                      Acceder
                    </Nav.Link>
                  </li>
                </ul>
              </>
            )}
          </NavDropdown>

          {/* Menu Hambuguesa */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-1" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-100  d-lg-flex order-4 justify-content-end align-items-center"
          >
            <Nav className="p-2 w-100  col-lg-12  ">
              <div className="d-lg-none d-flex w-100">
                <div className="  w-75">
                  <Buscador buscar={search} />
                </div>
              </div>
              <div className=" col-lg-3 m-0 d-lg-flex justify-content-start d-flex">
                <span className=" d-none d-lg-block">{locationIcons}</span>
                <Nav.Link as={NavLink} to="contacto">
                  Dirección
                </Nav.Link>
              </div>
              <div className="col-lg-6 d-lg-flex  justify-content-start  ">
                <ul className=" d-flex flex-column flex-lg-row justify-content-center gap-lg-3 p-0">
                  <li>
                    {" "}
                    <NavDropdown title="Categorias" id="basic-nav-dropdown">
                      {categories.map((category) => (
                        <>
                          <Nav.Link
                            key={category.id}
                            className=" p-2"
                            as={NavLink}
                            to={`productos/${category.name}`}
                        
                          >
                            {category.name}
                          </Nav.Link>
                        </>
                      ))}
                    </NavDropdown>
                  </li>
                  <li>
                    <Nav.Link as={NavLink} to="contacto">
                      Contacto
                    </Nav.Link>
                  </li>
                  <li>
                    {" "}
                    <Nav.Link as={NavLink} to="help">
                      Ayuda
                    </Nav.Link>
                  </li>
                </ul>

                <div className=" d-lg-none">
                  {isAuthenticated && user.rule === "admin" ? (
                    <>
                      <Nav.Link as={NavLink} to="carrito">
                        {iconoCarrito}
                      </Nav.Link>
                      <Nav.Link as={NavLink} to="favorit">
                        {iconoFavorito}
                      </Nav.Link>
                      <div className="contadorFavMovil">{favsPage.length}</div>
                      <div className="contadorMovil">
                        {productShopping.length}
                      </div>
                      <Nav.Link as={NavLink} to="admin">
                        Admin
                      </Nav.Link>
                    </>
                  ) : null}
                </div>
              </div>
              <div className=" col-lg-3 justify-content-end d-none d-lg-flex   ">
                {isAuthenticated && user.rule === "admin" ? (
                  <>
                    <NavDropdown title={user.nameUser} id="basic-nav-dropdown">
                      <btn
                        className=" p-3 pointer"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Salir
                      </btn>
                    </NavDropdown>
                    <Nav.Link as={NavLink} to="admin">
                      Admin
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="favorit">
                      {iconoFavorito}
                    </Nav.Link>
                    <div className="contadorFav">{favsPage.length}</div>

                    <Nav.Link as={NavLink} to="carrito">
                      {iconoCarrito}
                    </Nav.Link>
                    <div className="contador">{productShopping.length}</div>
                  </>
                ) : isAuthenticated ? (
                  <>
                    <NavDropdown title={user.nameUser} id="basic-nav-dropdown">
                      <btn
                        className=" p-3 pointer"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Salir
                      </btn>
                    </NavDropdown>

                    <Nav.Link as={NavLink} to="favorites">
                      {iconoFavorito}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="carrito">
                      {iconoCarrito}
                    </Nav.Link>
                    <div className="contador">{productShopping.length}</div>
                  </>
                ) : (
                  <>
                    <ul className=" d-flex gap-3 ">
                      <li>
                        <Nav.Link as={NavLink} to="registro">
                          Registro
                        </Nav.Link>
                      </li>
                      <li>
                        <Nav.Link as={NavLink} to="login">
                          Acceder
                        </Nav.Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarEx;
