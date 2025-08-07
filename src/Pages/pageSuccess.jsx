import { useEffect } from "react";
import { useShoppingContext } from "../Context/ShoppingContext";
import { useProducts } from "../Context/ProductsContext";
import { PagoPay } from "../fetch/shopping";
import { deleteShoppingRequest } from "../api/products";

const PageSuccess = () => {
  const { total } = useShoppingContext();
  const {
    // productShopping,
    getCarroId,
    deleteShopping,
  } = useProducts();

  useEffect(() => {
  
      const webhook = async () => {
        console.log("soy el webhook");
        let PayShopping = {
          cid: getCarroId,
          TotalCarro: total,
        };

        await PagoPay(PayShopping);
        deleteShopping(getCarroId); // borrar el carro de la base de datos cuando se realiza el pago
        deleteShoppingRequest(getCarroId);
        console.log("eliminado")
      };
      webhook();
    
  }, []);

  // console.log(paymentId);
  return <div>Soy la pagina SUCCESS</div>;
};

export default PageSuccess;
