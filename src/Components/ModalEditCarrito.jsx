import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../Context/AuthContext";
// import { PostShoppings } from "../fetch/shopping";
import { useProducts } from "../Context/ProductsContext";

function ModalEditCarrito({element}) {

  const [show, setShow] = useState(false);
  // const [cantidad,setCantProduct]=useState();
  const { user, isAuthenticated } = useAuth();
  const { cantidad, setCantProduct, ModificarCantidadShopinng } = useProducts();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <p onClick={handleShow}>Modificar</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantidad Nueva</Form.Label>
              <Form.Control
                type="number"
                placeholder={element.cantidad}
                onChange={(e) => {
                  setCantProduct(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={async () => {
              let eid = element.eid._id;
              let IdUsu = user.id;
              let IdProduct = element.pid.IdProduct;
              let Product = { IdUsu, eid, IdProduct, cantidad };

              // const Modific =
              await ModificarCantidadShopinng(Product);
              handleClose();
              console.log(cantidad);
              // setCantProduct(cantidad);
            }}
          >
            Guardar Cambio
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditCarrito;
