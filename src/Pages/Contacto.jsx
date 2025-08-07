// import bgContact from "../assets/img/nosotros.jpg";
import "../Pages/CSS/Contacto.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";

import { useNavigate } from "react-router-dom";
import { createContactRequest } from "../api/contacto";

function Contacto() {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    (data.nameUser = user.nameUser),
      (data.email = user.email),
      // console.log(data);
      await createContactRequest(data);
    console.log("Contacto enviado correctamente");
    setTimeout(() => {
      reset();
    }, 2000);
  });

  const login = () => {
    if (!isAuthenticated) navigate("/login");
  };
  // console.log(user);

  return (
    <>
      <main className="container">
        <h1 className="text-success text-center ">SOY LA PAGINA CONCTACTO</h1>
        <div className="contactoBg"></div>
        <form className=" formulario">
          <h5>Dejanos tu mensaje y te responderemos lo más pronto posible.</h5>
          <div className=" mb-3 d-flex">
            <label className="col-sm-2 col-form-label text-end campoLabel">
              Nombre
            </label>
            <div className="col-sm-1 campoField">
              <input
                type="text"
                className="form-control "
                placeholder={isAuthenticated ? user.nameUser : "Nombre"}
                disabled={isAuthenticated ? true : false}
                //si esta autenticado que aparesca desabilitado si no vacio
              />
            </div>
          </div>

          <div className=" mb-3 d-flex">
            <label className="col-sm-2 col-form-label text-end campoLabel">
              Email
            </label>
            <div className="col-sm-10 campoField">
              <input
                type="email"
                placeholder={isAuthenticated ? user.email : "Email"}
                className="form-control "
                id="inputPassword3"
                disabled={isAuthenticated ? true : false}
              />
            </div>
          </div>
          <div className=" mb-3 d-flex ">
            <label className="col-sm-2 col-form-label text-end campoLabel ">
              Comentario
            </label>
            <div className="col-sm-10 campoField">
              {errors.description && (
                <span className=" fs-4 text-center  text-white  bg-danger mb-2  ">
                  {errors.description.message}
                </span>
              )}
              <textarea
                className={`form-control  ${
                  !isAuthenticated ? "texArea" : "text-dark"
                }`}
                placeholder={
                  !isAuthenticated
                    ? "Por favor inicia sesión para enviar el comentario "
                    : "Deja tu comentario aquí..."
                }
                maxLength={100}
                {...register("description", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  minLength: {
                    value: 5,
                    message: "El texto no puede ser menos de 5 caracteres",
                  },
                })}
                autoFocus
              ></textarea>
            </div>
          </div>
          <div className=" text-end">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={isAuthenticated ? onSubmit : login}
            >
              Enviar
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Contacto;
