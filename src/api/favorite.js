import instance from "./axios";
import { DATABASE_API } from "../../config";

//Productos favoritos de cada usuario
export const getFavsRequest = () => instance.get("/pageFavorites");

export const createFavRequest = async (id) => {
  let idjson = JSON.stringify(id);

  const response = await fetch(`${instance}/favorites`, {
    body: idjson,
    method: "POST",
    headers: { "content-type": "application/json" },
  });
  const data = response.json();
  return data;
};
export const deleteFavRequest = (id) => instance.delete(`/pageFavorites/${id}`);
