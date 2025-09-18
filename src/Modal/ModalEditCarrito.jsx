import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAuth } from "../Context/AuthContext";
import { useProducts } from "../Context/ProductsContext";
import { arrowIconsUp } from "../helpers/iconos";
import { useShopping } from "../Context/ShoppingContext";


function ModalEditCarrito({element}) {

  const [show, setShow] = useState(false);
  // const [cantidad,setCantProduct]=useState();
  const { user, isAuthenticated } = useAuth();
  const { cantidad, setCantProduct } = useProducts();
  const { ModificarCantidadShopinng } = useShopping();

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <p onClick={handleShow}>{arrowIconsUp}</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar Cantidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantidad Nueva</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={element.eid.Stock}
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
          Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditCarrito;
