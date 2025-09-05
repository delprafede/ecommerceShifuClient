import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useProducts } from "../Context/ProductsContext.jsx";
import ModalCreateEspecific from "../ComponentAdmin/ModalCreateEspecific.jsx";
import { formatCurrency } from "../utils/index.js";
import ModalEditProductss from "../ComponentAdmin/ModalEditProductos.jsx";
import { DeleteProducts } from "../FetchAdmin/Products.js";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import ModalImageProducts from "./ModalImage.jsx";
import { set } from "react-hook-form";
import { use } from "react";



function GetListaProductos() {
  const { productsPage, getProducts } = useProducts();
  const [deleteProducts, setDeleteProducts] = useState(false)
  
  const alertasDelete = () => {
     toast.error("Eliminaste el producto de Administración");
     setDeleteProducts(!deleteProducts)
   };
  useEffect(() => {
    getProducts();
  }, [deleteProducts]);
  return (
    <>
      {productsPage.map((product, index) => {
        return (
          <Table striped bordered hover key={index}>
            <thead className="">
              <tr>
                <th className="">Imagen</th>
                <th>Id Producto</th>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className=" text-center  ">
              <tr className="">
                <td className="containerCard">
                  <img
                    className="card-img-top "
                    src={product.UrlImagen[0].secure_url}
                    alt={`imagen ${index}`}
                  />
                </td>
                <td>{product.IdProduct}</td>
                <td>{product.NombreProducto}</td>
                <td>{formatCurrency(product.Precio)}</td>
                <td>{product.Detalle}</td>
                <td className="d-flex flex-column justify-content-center gap-3 ">
                 
                    <button className=" btn btn-primary">
                      <ModalEditProductss product={product} />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={async () => {
                        await DeleteProducts(product._id);
                        alertasDelete();
                      }}
                    >
                      {" "}
                      Eliminar
                    </button>
                    <button className="btn btn-success"> Ver más</button>
                
                </td>
                {/* <td className="">
                </td> */}
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="">
                  <ModalCreateEspecific Id={product._id}></ModalCreateEspecific>
                </td>
                <td colSpan={3} className="">
                  <ModalImageProducts product={product} />
                  {/* <Button variant="primary">Agregar Imagenes</Button> */}
                  {/* <Button variant="primary">Agregar Imagen</Button> */}
                </td>
              </tr>
            </tfoot>
          </Table>
        );
      })}
        <Toaster
        theme="dark"
        position="top-center"
        dir="ltr"
        duration={5000}
       richColors
       
      />
    </>
 
  );
}

export default GetListaProductos;


