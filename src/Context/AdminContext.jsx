import { createContext, useContext, useState } from "react";
import {
  creatEspecificationsResquest,
  getEspecificationsRequest,
} from "../api/products";

const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin debe utilizarse dentro del AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [newEspecific, setNewEspecific] = useState("");
  const [especificationsOk, setEspecificacionesOk] = useState({});
  //CREA LAS ESPECIFICACIONES DEL PORDUCTO
  const createEspecifications = async (data) => {
    try {
      const res = await creatEspecificationsResquest(data);
      setEspecificacionesOk(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getEspecifications = async (data) => {
    console.log(data)
    try {
      const res = await getEspecificationsRequest(data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        newEspecific,
        setNewEspecific,
        createEspecifications,
        getEspecifications,
        especificationsOk,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
