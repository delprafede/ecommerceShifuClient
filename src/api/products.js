import { insert } from "formik";
import instance from "./axios.js";

//productos
export const getProductsRequest = () => instance.get(`/products`);

export const getProductCardRequest = (id) => instance.get(`/productCard/${id}`);

 export const creatEspecificationsResquest = (data)=> instance.post("/Admin/Especificaciones", {data})

// (Especificacion) => {
//   let ProdString = JSON.stringify(Especificacion);
//   console.log(ProdString);
//   const response = await fetch(`${instance}/Admin/Especificaciones`, {
//     body: ProdString,
//     method: "POST",
//     headers: { "content-type": "application/json" },
//   });
//   const data = response.json();

//   return data;
// };

export const getEspecificationsRequest = async (Cart) =>
  instance.post(`/productCardE`, { Cart });


export const getEspecificacionesT = async (Talle) => {
  let TalleJson = JSON.stringify(Talle);

  const response = await fetch(`${instance}/productCardT`, {
    method: "POST",
    body: TalleJson,
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();

  return data;
};

export const getProductsShoppingRequest = () => instance.get(`/carritos`);

export const deleteShoppingRequest = (id) => instance.delete(`/elimina/${id}`);

export const createComentriesRequest = (comentries) =>
  instance.post(`/comentrie`, comentries);

export const getComentriesRequest = async (id) => {
  const response = await fetch(`${instance}/comentries/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();

  return data;
};
