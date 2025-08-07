import { createContext, useContext, useState } from "react";

const EditProductContext = createContext();

const UseEdit = () => {
  const Context = useContext(EditProductContext);

  if (!Context) throw new Error("useFav must be used within the FavProvider");
  return Context;
};

const EditProvider = ({ children }) => {
  const [NewEditProduct, setNewEditProduct] = useState(Object);
  const [NewEditEspecific, setNewEditEspecific] = useState(Object);

  return (
    <EditProductContext.Provider
      value={{
        NewEditProduct,
        setNewEditProduct,
        NewEditEspecific,
        setNewEditEspecific,
      }}
    >
      {children}
    </EditProductContext.Provider>
  );
};

export { UseEdit, EditProvider };
