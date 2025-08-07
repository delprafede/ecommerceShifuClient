import instance from "./axios";
//productos
// export const getProductsRequest = () => instance.get(`/products`);

// export const getProductCardRequest = (id)=> instance.get(`/productCard/${id}`);




//Productos favoritos de cada usuario
export const getFavsRequest = () => instance.get("/pageFavorites");


export const deleteFavRequest = (id)=> instance.delete(`/pageFavorites/${id}`);

export const createFavRequest = async(id)=> {
                                    // console.log(id)
                                    let idjson=JSON.stringify(id);
                                    // console.log(idjson)
                                    const response=await fetch(`http://localhost:6060/api/favorites`,
                                {body:idjson,
                                    method:"POST",
                            headers:{"content-type":"application/json"},

                        });
                        const data=response.json();
                        return data

}
// export const createFavRequest = (product1) => {
//   instance.post(`/favorites`, product1);
// };