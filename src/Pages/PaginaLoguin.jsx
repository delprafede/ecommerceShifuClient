// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { iconEyesBlock, iconEyes } from "../helpers/iconos";
import useLocalStorage from "../CustonHook/useLocalStorage";
import { PostShoppings } from "../fetch/shopping";
// ----------------------------------------------------------------

const PaginaLoguin = () => {
  // const [show, setShow] = useState(false);
  const [productLocal, setProductLocal] = useLocalStorage("productLocal", []);

  const [eyes, setEyes] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { signin, user, errors: setErrors, isAuthenticated } = useAuth();

  // useEffect(() => {

  // }, []);

  const onSubmit = handleSubmit((data) => {
    signin(data);
   
  });
  const productStorage = useMemo(async() => {
    if (isAuthenticated && window.localStorage.getItem("productLocal")) {

     const IdUsuProductStorage = {
      IdUsu: user.id,
      productLocal: productLocal
     }
    const res= await PostShoppings(IdUsuProductStorage);
     console.log("Productos enviados al carrito:", res);
    } else {
      console.log("No hay productos en el carrito");
    }
  }, [isAuthenticated]);

  const cambiarVista = () => {
    setEyes(!eyes);
    console.log(eyes);
  };

  return (
    <div className="p-1">
      <h1 className=" text-center ">Acceder</h1>
      <div className=" container  d-flex justify-content-center  align-items-center p-2 maxW border border-2 border-dark rounded-3 shadow-lg bg-body-secondary mb-5">
        <form className=" p-2 bg-gradient w-100 my-4" onSubmit={onSubmit}>
          {setErrors.length > 0 && (
            <span className=" fs-4 text-center mt-1 text-danger">
              {setErrors}
            </span>
          )}

          <div className="mb-3">
            <label className="form-label fst-italic fw-bold">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="username"
              placeholder="Ingresa tu email"
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
              id="exampleInputPassword"
            />
            {errors.email && (
              <span className=" fs-4 text-center mt-1 text-danger ">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fst-italic fw-bold d-flex">
              Password
            </label>
            <div className="d-flex">
              <input
                type={eyes ? "text" : "password"}
                name="password"
                autoComplete="current-password"
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
                    message: "La contraseña no puede superar los 20 caracteres",
                  },
                })}
                className="form-control"
                id="exampleInputPassword1"
              />
              <div className="iconEyes" onClick={cambiarVista}>
                {eyes ? iconEyesBlock : iconEyes}
              </div>
            </div>

            {errors.password && (
              <span className=" fs-4 text-center  mt-1 text-danger   ">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="w-100 d-flex justify-content-center mb-4">
            <button
              type="submit"
              className="btn btn-primary mt-2 mb-2  d-flex w-100 justify-content-center"
            >
              Iniciar sesión
            </button>
          </div>
          <btn className=" ">
            <NavLink to="/sendEmail" className=" text-black mt-4 ">
              Olvidaste tu Contraseña?
            </NavLink>
          </btn>
          <div className="d-flex align-items-center gap-2 mt-4">
            <p className="d-flex text-black fst-italic align-items-center">
              No tienes una cuenta?
            </p>

            <NavLink to="/registro" className=" text-primary fst-italic">
              Registrarme
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaginaLoguin;
