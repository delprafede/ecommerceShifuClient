import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useProducts } from "../Context/ProductsContext";
import { get, set, useForm } from "react-hook-form";
import { searchIcons } from "../helpers/iconos";
import { useEffect } from "react";
const Buscador = () => {
  const { register, handleSubmit, reset } = useForm();

  const { searcher, search, setSearch, getProducts } = useProducts();
  const onSubmit = handleSubmit((data) => {
   if(data.search !== "") {
   
    searcher((data.search).trim())
   }
    reset();
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group d-flex justify-content-center  align-items-center">
          <input
            type="text"
            className=" imputBuscar"
            aria-describedby="emailHelp"
            placeholder="Buscar Productos"
            {...register("search")}
          />
          {/* {errors.search && (
            <span className="text-danger">{errors.search.message}</span>
          )} */}
          <button type="submit" aria-label="Search" className=" iconoBuscar">
            {" "}
            {searchIcons}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Buscador;
