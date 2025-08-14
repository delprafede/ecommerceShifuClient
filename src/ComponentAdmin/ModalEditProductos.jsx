import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
// import { UploadProducts } from "../FetchAdmin/Products";
import { useProducts } from "../Context/ProductsContext";

function ModalEditProductss({ product }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { register, handleSubmit } = useForm();
  const { getProducts } = useProducts();
  const onSubmit = handleSubmit(async (data) => {
    data.id = product._id;
    //  await UploadProducts(data);

    console.log(product)
    handleClose();
  });

  useEffect(() => {
    getProducts();
  }, [show]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Modificar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                defaultValue={product.NombreProducto}
                placeholder={product.NombreProducto}
                {...register("NombreProducto")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                className="form-control"
                defaultValue={product.Detalle}
                placeholder={product.Detalle}
                {...register("Detalle")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                defaultValue={product.Precio}
                placeholder={product.Precio}
                {...register("Precio")}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ultimo Precio</label>
              <input
                type="number"
                className="form-control"
                defaultValue={product.UltimoPrecio}
                placeholder={product.UltimoPrecio}
                {...register("UltimoPrecio")}
              />
            </div>
            <div className="w-100 d-flex justify-content-end gap-3">
              <button onClick={handleClose} className="btn btn-secondary">
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditProductss;
