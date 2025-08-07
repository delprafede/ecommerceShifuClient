import { Outlet } from "react-router-dom";
import NavBarEx from "./NavBarEx";
import Footer from "./Footer";





const Layout = () => {
  
  // const { productShopping, getProductShopping,quantity } = useProducts();
 
  return (
  
     <div className="contenedor">
      
        <>
          <header className="sticky-top">
            <NavBarEx />
           
          </header>
          <main className="">
            
          <Outlet />
          </main>

          <footer className=" bg-body-secondary">
            <Footer />
          </footer>
        </>
     
    </div>
  
  );
};

export default Layout;
