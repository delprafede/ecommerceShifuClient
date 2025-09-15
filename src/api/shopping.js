import instance from "./axios.js";

export const ShoppingPaymentRequest = (carrito) =>
  instance.post(`/create-order`, carrito);
export const CreateProductAdmin = (product) =>
  instance.post(`/Admin/Crea`, product);

export const GetIdUsu = async (Cart) => {
  let CartJson = JSON.stringify(Cart);

  const response = await fetch(`${instance}/carritos/IdUsu`, {
    method: "POST",
    body: CartJson,
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();

  return data;
};

export const postShoppingsRequest = async (carrito) =>
  instance.post(`/carrito`, carrito);

// const PostShoppings = async (Cart) => {
// )
// let CartJson = JSON.stringify(Cart);

// const response = await fetch(`${instance}/carrito`, {
//   method: "POST",
//   body: CartJson,
//   headers: {
//     "content-type": "application/json",
//   },
// });
// console.log(CartJson);
// const data = response.json();

// return data;
// };

const DeleteProduct = async (Product) => {
  let ProductJson = JSON.stringify(Product);

  const response = await fetch(`${instance}/carrito`, {
    method: "DELETE",
    body: ProductJson,
    headers: {
      "content-type": "application/json",
    },
  });

  const data = response.json();

  return data;
};
// const DeleteShopping = async (id) => {
//     console.log(id)
// //   let ProductJson = JSON.stringify(id);

//   const response = await fetch(`http://localhost:6060/api/elimina`, {
//     method: "DELETE",
//     model: "no-cors",
//     credentials: "include",
//     body: id,
//     headers: {
//       "content-type": "application/json",
//     },
//   });

//   const data = response.json();

//   return data;
//   // console.log(data)
// };

// const PagoPay = async (Carrito) => {
//   let CarritoJson = JSON.stringify(Carrito);

//   const response = await fetch(`http://localhost:6060/api/carrito/confirma`, {
//     method: "POST",
//     body: CarritoJson,
//     headers: {
//       "content-type": "application/json",
//     },
//   });

//   const data = response.json();

//   return data;
// };
// const GetShoppings = async ()=> {

//     const response=await fetch(`http://localhost:6060/api/carritos`,{
//         method:"GET",

//         headers:{
//             "content-type":"aplication/json"

//         },

//     });

//         const data=response.json();

//         return data
// }

//API QUE TRAE DEL BACK LOS PRODUCTOS DEL CARRITO
//  export  async function GetShoppings (IdUsu) {
//     const IdUsuS = JSON.stringify(IdUsu);
//     const response = await fetch(`http://localhost:5050/api/carritos`, {
//       method: "POST",
//       body: IdUsuS,

//       headers: {
//         "content-type": "aplication/json",
//       },
//     });

//     const data = response.json();

//     return data;
//   }

// const GetIdUsu = async (Cart)=> {
//     let CartJson=JSON.stringify(Cart)

// const response=await fetch(`http://localhost:5000/api/carrito/IdUsu`,{
//     method:"POST",
//     body:CartJson ,
//     headers:{
//         "content-type":"application/json"

//     },

// });

//     const data=response.json();

//     return data
// }

export {
  DeleteProduct,
  // PagoPay,
  // DeleteShopping,
  // GetIdUsu
};
