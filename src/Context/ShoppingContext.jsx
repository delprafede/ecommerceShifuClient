import { createContext, useContext, useState } from "react";
import { ShoppingPaymentRequest, postShoppingsRequest } from "../api/shopping";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const ShoppingContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useShopping = () => {
  const context = useContext(ShoppingContext);

  if (!context) throw new Error("useFav must be used within the FavProvider");
  return context;
};
// eslint-disable-next-line react/prop-types
export const ShoppingProvider = ({ children }) => {
    initMercadoPago("APP_USR-ee7c2a9d-4725-4e64-bf91-ad5ba9a3c2a2", {
    locale: "es-AR",
  });
  const [payment, setPayment] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [spinnerCar, setSpinnerCar] = useState(true);


  const postShopping= async (carrito) => {
 const res = await postShoppingsRequest(carrito)
 console.log(res)
  }

  const createOrderPayment = async (carrito) => {
    console.log(carrito);
    try {
      const res = await ShoppingPaymentRequest(carrito);
      setPayment(res.data.init_point);
      setPaymentId(res.data.id);
      console.log(res.data.init_point);
      console.log(res.data.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShoppingContext.Provider
      value={{
        createOrderPayment,
        payment,
        paymentId,
        spinnerCar,
        setSpinnerCar,
        postShopping,
        setPaymentId
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
