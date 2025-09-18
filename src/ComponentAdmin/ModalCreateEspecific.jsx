import { useState } from "react";
import { useAdmin } from "../Context/AdminContext.jsx";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast, Toaster } from "sonner";

function MOdalCreateEspecific({ product }) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    newEspecific,
    setNewEspecific,
    createEspecifications,
    especificationsOk,
  } = useAdmin();

  const alertEspecificationsOk = () => {
    return toast.success("Especificaciones Agregadas");
  };

  const handleChange = (data) => {
    createEspecifications({
      ...data,
      _IdProduct: product._id,
      IdProduct: product.IdProduct,
      CodColor: newEspecific,
    });
    setTimeout(() => {
      if (especificationsOk.status === "OK") {

        alertEspecificationsOk();
        handleClose();
        reset()
      }
    }, 2000);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          handleShow();
        }}
      >
        Agregar Especificaciones
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Especificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleChange)}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Blanco"
                {...register("Color")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Talle
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="36"
                {...register("Talle")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label">
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput3"
                placeholder="10"
                {...register("Stock")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput4" className="form-label">
                Codigo Color
              </label>
              <input
                type="color"
                className="form-control w-25"
                id="exampleFormControlInput4"
                onChange={(e) => {
                  setNewEspecific(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput5" className="form-label">
                Codigo Color Hexadecimal
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput5"
                disabled
                placeholder="#000000"
                value={newEspecific}
              />
            </div>
            <div className=" d-flex justify-content-end gap-3">
              <button
                className="btn btn-secondary"
                variant="secondary"
                onClick={() => {
                  handleClose();
                }}
              >
                Cerrar
              </button>
              <button className="btn btn-primary" variant="primary">
                Agregar Especificacion
              </button>
            </div>
          </form>
          <Toaster
            theme="light"
            position="top-center"
            duration={2000}
            richColors
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MOdalCreateEspecific;
