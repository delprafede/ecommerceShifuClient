import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { UploadImgProducts } from "../FetchAdmin/Products";
import { useProducts } from "../Context/ProductsContext";

function ModalImageProducts({ product }) {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { getProducts } = useProducts();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_id", product._id);
    formData.append("UrlImagen", files);
    console.log(formData);
    await UploadImgProducts(formData);
    handleClose();
    // return {};
  };

  useEffect(() => {
    getProducts();
  }, [show]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Agregar Imagen
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Agregar Imagen al Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label fw-bold">
                {product.NombreProducto}
              </label>
              <input
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
                className="form-control"
                type="file"
                id="formFile"
              />
            </div>
            <div className="w-100 d-flex justify-content-end gap-3">
              <button type="submit" className="btn btn-primary">
                Subir Imagen
              </button>
              <button onClick={handleClose} className="btn btn-secondary">
                Cerrar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalImageProducts;
