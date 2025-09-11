import { insert } from "formik";
import instance from "./axios.js";

//productos
export const getProductsRequest = () => instance.get(`/products`);

export const getProductCardRequest = (id) => instance.get(`/productCard/${id}`);

export const getEspecificaciones = async (Cart) => {
  let CartJson = JSON.stringify(Cart);

  const response = await fetch(`${instance}/productCardE`, {
    method: "POST",
    body: CartJson,
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();

  return data;
};

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
