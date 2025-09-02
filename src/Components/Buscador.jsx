import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useProducts } from "../Context/ProductsContext";
import { set, useForm } from "react-hook-form";
import { searchIcons } from "../helpers/iconos";
import { useEffect } from "react";
const Buscador = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const { searcher, search, setSearch,getProducts } = useProducts();
  const onSubmit = handleSubmit((data) => {
 
    setSearch(data.search);
    reset();
  

  });

  
  
  return (
    <div>
      {/* <InputGroup className="">
        <Form.Control
          placeholder="Buscar Producto"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={search}
          onChange={searcher}
        />
      </InputGroup> */}
      <form 
      onSubmit={onSubmit}
       >
        <div className="form-group d-flex justify-content-center  align-items-center">
          <input
            type="text"
            className=" imputBuscar"
            aria-describedby="emailHelp"
            placeholder="Buscar Productos"
            {...register("search")}
          />
        <button 
         
          type="submit"
          aria-label="Search"
        className=" iconoBuscar">
          {" "}
          {searchIcons}
        </button>
        </div>
      </form>

      {/* <Form
        onChange={searcher}
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
        id="formBuscar"
        role="search"
      className="d-flex ">
        <Form.Control
          type="search"
          placeholder="Buscar productos"
          className=" imputBuscar"
          aria-label="Search"
          value={search}
          
        /> */}
      {/* <Button
          
          variant="" className="iconoBuscar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="green"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </Button>
      </Form> */}
    </div>
  );
};
export default Buscador;
