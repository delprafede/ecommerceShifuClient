import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    // reset,
  } = useForm();

  const navigate = useNavigate();
  const { errors: sendErrors, sendEmail, send } = useAuth();

  const alertas = () => {
    return toast.success("Pedido enviado con éxito, verifique su correo");
  };
  const onSubmit = handleSubmit(async (data) => {
    await sendEmail(data);
  });
  useEffect(() => {
    if (send === true) {
      console.log(send)
      alertas();
     const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer)
    }
  }, [send, navigate]);

  return (
    <div className="">
      <h1 className=" text-center my-4 ">Modificacion de contraseña</h1>
      <div className=" container  d-flex justify-content-center bg-body-secondary  align-items-center p-2 maxW border border-2 border-dark rounded-3 shadow-lg my-4 ">
        <form className="p-2 w-100 p-4  ">
          {sendErrors !== "" && (
            <span className=" fs-4 text-center mt-1  text-white  bg-danger  ">
              {sendErrors}
            </span>
          )}
          <div className="mb-3 my-4">
            <label className="form-label fst-italic fw-bold">Email</label>
            <input
              type="email"
              name="email"
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
          </div>

          <button type="button" className="btn btn-primary mt-2 mb-2  d-flex w-100 justify-content-center" onClick={onSubmit}>
            Enviar
          </button>
         
        </form>
      </div>
      <Toaster theme="light" position="top-center"
      duration={2000}
      
      toastOptions={{
        style: { background: 'gren' },
        className: 'my-toast',
      }}
    />
    </div>
  );
};

export default ResetPassword;
