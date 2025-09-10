// import AltaProducts from "../ComponentAdmin/AltaProductos.jsx";
import FormAdminProduct from "../Components/FormAdminProduct.jsx";
import GetListaProductos from "../Components/ListaProductos.jsx";
// import GetListaProductos from "../ComponentAdmin/ListaProductos.jsx";

// import { Image } from "../ComponentAdmin/Altaimagen.jsx";
// import { useProducts } from "../Context/ProductsContext.jsx";
// import { useEffect } from "react";
// import TableProductsList from "../Components/TableProductsList.jsx";

const PageAdmin = () => {
  return (
    <>
      <div className=" container mb-5">
        <h2 className=" text-center fw-bold my-5">Carga de Productos</h2>

        <FormAdminProduct />
      </div>

      <div className="container mb-5">
        <h2 className=" text-center fw-bold my-5"> Productos</h2>

        <GetListaProductos />
      </div>
    </>
  );
};

export default PageAdmin;
