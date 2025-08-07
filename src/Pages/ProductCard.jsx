// import { Link, useNavigate } from "react-router-dom";
// import { iconofavorito } from "../helpers/iconos";
// import { toast } from "sonner";
// import { useAuth } from "../Context/AuthContext";
// import { createFavRequest } from "../api/favorite";
// import { useProducts } from "../Context/ProductsContext";
// import { useFav } from "../Context/FavContext";
// import { useEffect, useState } from "react";
// import "../Pages/ProductCard.css";

// //Renderizada cada uno de los productos
// const PaginaArticulo = ({ product }) => {
//   const { user, isAuthenticated } = useAuth();
//   const { getProduct, productsPage } = useProducts();
//   const { favsPage, getProductsFavorite, remove } = useFav();
//   const [cambiar, setCambiar] = useState(false);
//   const navigate = useNavigate();

//   const alertas = () => {
//     return toast.success("Debes iniciar sesion");
//   };
//   const alertas1 = () => {
//     return toast.success("Agregaste a favoritos");
//   };

//   useEffect(() => {
//     getProductsFavorite();
//     favPage()
    
//   }, [cambiar]);
  
//   const favPage = ()=> {
//     (favsPage.map((fav)=>{
//       fav.length=== 0 ? console.log("no tines favoritos") : console.log(fav._id);
//       }));
//   } 
//   const handleClick = async () => {
//     if (!isAuthenticated) {
//       alertas();
//     } else {
//       const product1 = {
//         product: product._id,
//         user: user.id,
//         agregado: true,
//       };
//       // console.log(user);
//       const res = await createFavRequest(product1);
//       // console.log(res);
//       alertas1();
//     }
//     setCambiar(true);
//     // {
//     //   cambiar === true
//     //     ? () => {
//     //         setCambiar(false);
//     //         remove(product._id);
//     //       }
//     //     : "";
//     // }
//   };

//   return (
//     <div>
//       <div className="container-products " key={product._id}>
//         <div className=" card-product ">
//           <figure className="container-img"
//           >
//             <img
//               className=""
//               src={product.UrlImagen}
//               alt="soy yo"
//             />
//           </figure>

//           <div className="info-product">
//             <btn
//              onClick={()=> {
//               console.log(product.NombreProducto)
//             }}>hola mundo </btn>
//           </div>
//           <div className="btnIcon">
//             <div className=" col-4 ">
//               <p className="price">$  </p>
//             </div>
//             <div className=" d-flex col-8 justify-content-end g-3 ">
//               <button
//                 onClick={async () => {
//                   await getProduct(product._id);
//                   navigate(`/productCard/${product._id}`);
//                   console.log(product._id);
//                 }}
//               >
//                 Ver Mas
//               </button>
//               {/* {favsPage.length > 0 ? (
//                 favsPage.map((fav, index) => {
//                   if (product._id === fav.product._id) {
//                    return (
//                       <button
//                         key={index}
//                         className="CorazonRed"
//                         type="submit"
//                         onClick={handleClick}
//                       >
//                         {iconofavorito}
//                       </button>
//                     )
//                   } else {
//                    return(
//                       <button
//                         key={index}
//                         className=" bg-danger"
//                         type="submit"
//                         onClick={handleClick}
//                       >
//                         {iconofavorito}
//                       </button>
//                     )
//                   }
//                 })
//               ) : (
//                 )} */}
//                 <button className="CorazonBlanco" type="submit" onClick={handleClick}>
//                   {iconofavorito}
//                 </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaginaArticulo;
// //cambiar ? "CorazonRed" : "CorazonBlanco"
