import { createContext, useContext, useState } from "react";
import {
  ShoppingPaymentRequest,
  postShoppingsRequest,
  deleteProductShoppingRequest,
} from "../api/shopping";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { getProductsShoppingRequest } from "../api/products";

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
  const [productShopping, setProductShopping] = useState([]);
  const [quantity, setQuantity] = useState(productShopping.length);
  //DECREMENTA LA CANTIDAD DE PRODUCTOS
  const DecrementQty = () => {
    if (productShopping.length > 0) {
      setQuantity((prevCont) => prevCont - 1);
    }
  };
  //INCREMENTA LA CANTIDAD DE PRODUCTOS
  const IncrementQty = () => {
    setQuantity((prevCont) => prevCont + 1);
  };
  const getProductShopping = async () => {
    try {
      const res = await getProductsShoppingRequest();

      setProductShopping(res.data.DetalleCarro);

      // setGetCarroId(res.data._id);
    } catch (error) {
      console.log(error.response);
    }
  };
  const postShopping = async (carrito) => {
    console.log(carrito);
    const res = await postShoppingsRequest(carrito);
    console.log(res);
  };
  const ModificarCantidadShopinng = async (Product) => {
    try {
      const res = await postShoppingsRequest(Product);
      console.log(res);
      if (res.status == 200) {
        setProductShopping(res.data.data.DetalleCarro);
      }
    } catch (error) {
      console.log(error, "no me estoy aplicando");
    }
  };
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
  const deleteProductShopping = async (product) => {
    try {
      const res = await deleteProductShoppingRequest(product);
      console.log(res);
      if (res.status == 200) {
        productShopping.filter((product) => product.eid._id !== id);
        setProductShopping(productShopping);
      }
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
        productShopping,
        quantity,
        setSpinnerCar,
        postShopping,
        setPaymentId,
        deleteProductShopping,
        getProductShopping,
        setProductShopping,
        ModificarCantidadShopinng,
        DecrementQty,
        IncrementQty,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
