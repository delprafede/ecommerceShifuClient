import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import {UseEdit } from '../ContextAdmin/EditContext.jsx';
import {
  GetCompleteProduct,
  UploadEspecificaciones,
} from "../FetchAdmin/Products.js";

function ModalEditProduct({ product }) {
  const [show, setShow] = useState(false);
  const [newEditProduct, setNewEditProduct] = useState(Object);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const{NewEditEspecific,setNewEditEspecific}=UseEdit();
  const ChangeEdit = (e) => {
    setNewEditProduct({
      // ...newEditProduct,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(product);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modificar Detalles
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Detalles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onChange={ChangeEdit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre Producto</Form.Label>
              <Form.Control
                type="text"
                name="NombreProducto"
                placeholder={product.NombreProducto}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                name="Detalle"
                placeholder={product.Detalle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="Precio"
                placeholder={product.Precio}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              console.log(newEditProduct);
              //     const EditEsp=product;

              //     const ids={
              //       id2:EditEsp._id,
              //       id:EditEsp.IdProduct
              //     }

              //     const GetEspecificProduct=await GetCompleteProduct(ids)

              // setNewEditEspecific({
              //   ...NewEditEspecific,
              //      id:EditEsp._id,
              //    })

              //    const ModificEspeficific=await UploadEspecificaciones(NewEditEspecific)

              //    console.log(GetEspecificProduct)
              //    console.log(NewEditEspecific)
              //    console.log(ModificEspeficific)
              //  handleClose();
            }}
          >
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditProduct;
