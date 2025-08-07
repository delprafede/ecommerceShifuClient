import { useForm } from "react-hook-form";

// import { useAuth } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { updatePasswordRequest } from "../api/auth";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useAuth } from "../Context/AuthContext";
import { iconEyes, iconEyesBlock } from "../helpers/iconos";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    // reset,
  } = useForm();

  const params = useParams();

  const { forgot, updatePassword } = useAuth();
  const [eyes, setEyes] = useState(false);
  const [eyesSecund, setEyesSecund] = useState(false);

  // useEffect(() => {
  //   console.log(params);
  // }, []);
  const cambiarVista = () => {
    setEyes(!eyes);
  };
  const cambiarVistaSecund = () => {
    setEyesSecund(!eyesSecund);
  };
  const navigate = useNavigate();

  const alertas = () => {
    return toast.success("Password reestablecida con exito");
  };
  const onSubmit = handleSubmit((data) => {
    if ((params.id, params.token)) {
      updatePassword(params.id, params.token, data);
    }
    alertas();
  });
  useEffect(() => {
    if (forgot === true) {
      const timer = setTimeout(() => {
        navigate("/succesPassword");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [forgot]);
  return (
    <>
      <h1 className=" text-center mt-3">Cambio de Contraseña</h1>
      <div className=" container  d-flex justify-content-center bg-body-secondary  align-items-center p-2 maxW border border-2 border-dark rounded-3 shadow-lg my-4  ">
        {/* <form onClick={onSubmit} className="p-2  w-100  ">
          <div className="mb-3 my-4">
            <label className="form-label fst-italic fw-bold d-flex">
              {" "}
              Nueva Contraseña
            </label>
            <div className="d-flex">
              <input
                type={eyes ? "text" : "password"}
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
              />
              <div className="iconEyes" onClick={cambiarVista}>
                {eyes ? iconEyesBlock : iconEyes}
              </div>
            </div>

            {errors.password && (
              <span className=" fs-4 text-center mt-1  text-danger  ">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fst-italic fw-bold d-flex">
              Comfirmar Contraseña
            </label>
            <div className=" d-flex">
              <input
                type={eyesSecund ? "text" : "password"}
                placeholder="********"
                {...register("confirmarPassword", {
                  required: {
                    value: true,
                    message: "Confirmación de Contraseña es requerido.",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
                className="form-control "
              />
              <div className="iconEyes" onClick={cambiarVistaSecund}>
                {eyesSecund ? iconEyesBlock : iconEyes}
              </div>
            </div>
            {errors.confirmarPassword && (
              <span className="fs-4 text-center mt-1  text-danger ">
                {errors.confirmarPassword.message}
              </span>
            )}
          </div>

          <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-primary mt-2 mb-2  d-flex w-100 justify-content-center">
              Enviar
            </button>
          </div>
        </form> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-2 w-100 p-4 my-4  "
        >
          <div className="form-group">
            <label
              className="fst-italic fw-bold d-flex mb-3"
              for="exampleInputEmail1"
            >
              {" "}
              Nueva Contraseña
            </label>
            <div className="d-flex">
              <input
                type={eyes ? "text" : "password"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="*********"
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
              />
              <div className="iconEyes" onClick={cambiarVista}>
                {eyes ? iconEyesBlock : iconEyes}
              </div>
            </div>

            {errors.password && (
              <span className=" fs-3 text-center mt-1  text-danger  ">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="form-group mt-3">
            <label
              className="fst-italic fw-bold d-flex mb-3"
              for="exampleInputPassword1"
            >
              Confirmar Contraseña
            </label>
            <div className="d-flex">
              <input
                type={eyesSecund ? "text" : "password"}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="*********"
                {...register("confirmarPassword", {
                  required: {
                    value: true,
                    message: "Confirmación de Contraseña es requerido.",
                  },
                  validate: (value) =>
                    value === watch("password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              <div className="iconEyes" onClick={cambiarVistaSecund}>
                {eyesSecund ? iconEyesBlock : iconEyes}
              </div>
            </div>

            {errors.confirmarPassword && (
              <span className="fs-3 text-center mt-1  text-danger ">
                {errors.confirmarPassword.message}
              </span>
            )}
          </div>

          <div className="w-100 d-flex justify-content-center mt-3">
            <button className="btn btn-primary mt-2 mb-2  d-flex w-100 justify-content-center">
              Enviar
            </button>
          </div>
        </form>
      </div>
      <Toaster
        theme="light"
        position="top-center"
        duration={2000}
        toastOptions={{
          style: { background: "gren" },
          className: "my-toast",
        }}
      />
    </>
  );
};

export default ForgotPassword;
