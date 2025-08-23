import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { PostEspecificaciones } from "../FetchAdmin/Products.js";
import { useProducts } from "../Context/ProductsContext.jsx";
import { useEffect } from "react";

const Especificaciones = {
  Color: "",
  CodColor: "",
  Talle: "",
  Stock: "",
  Fecha: "",
  CodProducto: "",
  _IdProduct: "",
};

const Especific = () => {
  const { productsPage, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
    localStorage.setItem("Products", JSON.stringify(productsPage));
  }, []);

  return (
    <>

      <div className=" mt-4">
        <h1>Agregar Especificacion</h1>
        <div className=" bg-body-secondary">
          <Formik
            initialValues={Especificaciones}
            onSubmit={async (values) => {
              const Id = JSON.parse(localStorage.getItem("Id"));
              console.log(Id);
              values._IdProduct = Id;
              const PostE = await PostEspecificaciones(values);
              console.log(PostE.data);
              //  await new Promise((r) => setTimeout(r, 500));
              //  alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => (
              <Form className=" d-flex flex-column container bg-warning">
                <label htmlFor="Color">Color</label>
                <Field
                  className=" w-50"
                  name="Color"
                  placeholder="Azul"
                  type="text"
                />

                <label htmlFor="CodColor">CodColor</label>
                <Field className=" w-50" name="CodColor" type="text" />
                <Field className=" w-25" name="CodColor" type="color" />

                <label htmlFor="Talle">Talle</label>
                <Field className=" w-50" name="Talle" type="text" />

                <label htmlFor="Stock">Stock</label>
                <Field className=" w-50" name="Stock" type="text" />

                <label htmlFor="Fecha">Fecha</label>
                <Field className=" w-50" name="Fecha" type="Date" />

                <label htmlFor="CodProducto">CodProducto</label>
                <Field className=" w-50" name="CodProducto" type="text" />

                <button type="button" className="btn btn-success w-50 mt-4">
                  Enviar
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Especific;
