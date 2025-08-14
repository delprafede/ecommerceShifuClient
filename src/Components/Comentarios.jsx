import { useForm } from "react-hook-form";
import { useProducts } from "../Context/ProductsContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import spinnerLoading from "../assets/img/spinnerLoading.svg";

export const Comentarios = (props) => {
  // console.log(props.productCard._id)
  const params = useParams();
  const { getComentries, CreateComentries, comentries } = useProducts();
  const { register, handleSubmit, reset } = useForm();
  const { isAuthenticated } = useAuth();
  const [spinner, setSpinner] = useState(true);
  // const comentriesNew = () => {
  //   setLoading(!loading);
 
  // };

  const handleComentarios = handleSubmit((data) => {
    data.id = props.productCard._id;
    CreateComentries(data);
    setSpinner(!spinner);
    reset();
  });

  useEffect(() => {
    if (params.id) {
      getComentries(params.id);
    }
  }, [spinner]);

  useEffect(() => {
    const timerComentries = setTimeout(() => {
      setSpinner(false);
    }, 500);
    return () => clearTimeout(timerComentries);
  }, [spinner]);


  // console.log(comentries);

  return (
    <div>
      {" "}
      <h2 className=" text-center">Comentarios</h2>
      <div className="  p-3 w-100">
        <form 
          onSubmit={handleComentarios}
          className=" container d-flex justify-content-around align-items-center gap-2"
        >
          <textarea
            className="w-100 focus-ring-primary p-1 rounded-2"
            placeholder="Descripcion"
            rows="1"
            {...register("description")}
            
          ></textarea>

          <button
           

            className={`btn btn-primary ${isAuthenticated ? "" : "disabled"}`}
            onClick={handleComentarios}
          >
            Comentar
          </button>
        </form>
      </div>
      <div className=" d-flex gap-2 mt-4">
        <div className=" col-12 col-lg-6">
          {spinner ? (
            <img src={spinnerLoading} className="spinner" />
          ) : (
            comentries.map((comentario, index) => {
              return (
                <>
                  <p key={index} className=" p-3">
                    {comentario.description}
                  </p>
                  <span className=" text-center">
                    {new Date(comentario.date).toLocaleDateString()}
                  </span>
                  <hr />
                </>
              );
            }).reverse()
          )}
        </div>

       
      </div>
    </div>
  );
};
