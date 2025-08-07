import { useForm } from "react-hook-form";
import { CreateProductAdmin } from "../api/shopping";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

import { useProducts } from "../Context/ProductsContext";
// import GetListaProductos from "./ListaProductos";

const FormAdminProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState();
  const { productsPage, getProducts } = useProducts();
  const [spinner, setSpinner] = useState(true);
  const alertasUpp = () => {
    return toast.success("Producto en venta satisfactoriamente");
  };
  useEffect(() => {
    getProducts();
  }, [spinner]);
  const formAdminProduct = async (data) => {
    const formData = new FormData();

    formData.append("IdProduct", data.IdProduct);
    formData.append("NombreProducto", data.NombreProducto);
    formData.append("Precio", data.Precio);
    formData.append("Detalle", data.Detalle);
    formData.append("UltimoPrecio", data.UltimoPrecio);
    formData.append("Categoria", data.Categoria);
    formData.append("UrlImagen", files);

    await CreateProductAdmin(formData);
    reset();
    setFiles("");
    alertasUpp();
    setSpinner(false);

    return {};
  };

  return (
    <>
      <form
        className="  mb-5 p-3 border-3 rounded-2 shadow-lg"
        onSubmit={handleSubmit(formAdminProduct)}
      >
        <div className="mb-3">
          <label
            htmlFor="exampleInputEmail1"
            className="form-label fw-semibold"
          >
            ID Producto
          </label>
          <input
            type="text"
            className="form-control"
            name="IdProduct"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            {...register("IdProduct", {
              required: "El ID del producto es obligatorio",
            })}
          />
        </div>
        {errors.IdProduct && (
          <span className="text-danger">{errors.IdProduct.message}</span>
        )}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Nombre del Producto
          </label>
          <input
            type="tetxt"
            className="form-control"
            name="NombreDelProducto"
            id="exampleInputPassword1"
            {...register("NombreProducto", {
              required: "El nombre del producto es obligatorio",
            })}
          />
        </div>
        {errors.NombreProducto && (
          <span className="text-danger">{errors.NombreProducto.message}</span>
        )}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Detalle
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            {...register("Detalle", {
              required: "El detalle del producto es obligatorio",
            })}
          />
          {errors.Detalle && (
            <span className="text-danger">{errors.Detalle.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            {...register("Precio", {
              required: "El precio del producto es obligatorio",
            })}
          />
        </div>
        {errors.Precio && (
          <span className="text-danger">{errors.Precio.message}</span>
        )}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Ultimo Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            {...register("UltimoPrecio", {
              required: "El último precio del producto es obligatorio",
            })}
          />
        </div>
        {errors.UltimoPrecio && (
          <span className="text-danger">{errors.UltimoPrecio.message}</span>
        )}
        <div className="mb-3">
          <label
            htmlFor="exampleInputPassword1"
            className="form-label fw-semibold"
          >
            Categoria
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("Categoria", {
              required: "La categoría del producto es obligatoria",
            })}
          >
            <option selected>Selecciona una Categoria</option>
            <option value="Hombres">Hombres</option>
            <option value="Mujeres">Mujeres</option>
            <option value="Niños">Niños</option>
          </select>
        </div>
        {errors.Categoria && (
          <span className="text-danger">{errors.Categoria.message}</span>
        )}
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label fw-semibold">
            Cargar Imagen
          </label>
          <div className="d-flex  justify-content-between align-items-center">
            <div
              className="w-100
      "
            >
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
                // {...register("Imagen",
                //   { required: "La imagen del producto es obligatoria" }
                // )}
              />
            </div>
          <div className="d-flex justify-content-center mt-3">

            {files && (
              <img
                className="card w-50"
                src={URL.createObjectURL(files)}
                alt={files.name}
              />
            )}
          </div>
          </div>
           
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
 

      <Toaster
        theme="light"
        position="top-center"
        duration={2000}
        toastOptions={{
          style: { background: "blue" },
          className: "myToast",
        }}
      />
    </>
  );
};

export default FormAdminProduct;
