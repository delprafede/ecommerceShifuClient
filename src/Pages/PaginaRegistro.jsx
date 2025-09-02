import { useEffect, useMemo } from "react";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

import { NavLink } from "react-router-dom";

function PaginaRegistro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  const { signup, isAuthenticated, errors: authErrors } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    signup(data);
  });
  const porductStorage = useMemo(async () => {
    if (isAuthenticated && window.localStorage.getItem("productLocal")) {
      console.log("enviando");

      const { IdProduct, cantidad, color, eid } = productLocal;
      const IdUsuProductStorage = {
        IdUsu: user.id,
        IdProduct,
        cantidad,
        color,
        eid,
      };

      await PostShoppings(IdUsuProductStorage);
      navigate("/carrito");
      console.log("if porductStorage")
      const timer = setTimeout(() => {
        localStorage.removeItem("productLocal");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
      console.log("else porductStorage")
    }
  }, [isAuthenticated]);

  return (
    <div className="p-1">
      <h1 className=" text-center ">Registro</h1>
      <div className=" container  d-flex justify-content-center  align-items-center p-2 maxW border border-2 border-dark rounded-3 shadow-lg mb-5 bg-body-secondary ">
        <form className=" p-2 bg-gradient w-100 my-4 " onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label fst-italic fw-bold">Nombre</label>
            <input
              type="text"
              name="nameUser"
              autoComplete="off"
              placeholder="Ingrese su nombre"
              {...register("nameUser", {
                required: {
                  value: true,
                  message: "Nombre es requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos dos letras.",
                },
                maxLength: {
                  value: 20,
                  message: "Tu nombre es demasiado largo, maximo 20 letras.",
                },
              })}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            {errors.nameUser && (
              <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
                {errors.nameUser.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fst-italic fw-bold">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="ej: juan@gmail.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Correo electrónico es requerido",
                },
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@”]+(.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/,
                  message: "Correo invalido",
                },
              })}
              className="form-control"
              id="exampleInputPassword1"
            />
            {errors.email && (
              <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
                {errors.email.message}
              </span>
            )}

            {authErrors !== "" && (
              <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
                {authErrors}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fst-italic fw-bold">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="********"
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña es requerida.",
                },
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "La contraseña no puede superar",
                },
              })}
              className="form-control"
              id="exampleInputPassword2"
            />
            {errors.password && (
              <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fst-italic fw-bold">
              Comfirmar Password
            </label>
            <input
              type="password"
              name="confirmarPassword"
              placeholder="********"
              {...register("confirmarPassword", {
                required: {
                  value: true,
                  message: "Confirmación de la Contraseña es requerido.",
                },
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
              className="form-control"
              id="exampleInputPassword3"
            />
            {errors.confirmarPassword && (
              <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
                {errors.confirmarPassword.message}
              </span>
            )}
          </div>

          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary mt-2 mb-2  d-flex w-100 justify-content-center"
            >
              Registrarme
            </button>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
            <p className="d-flex   text-black fst-italic">
              Ya tienes una cuenta?
            </p>
            <NavLink to="/login" className="text-primary fst-italic">
              Acceder
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaginaRegistro;
