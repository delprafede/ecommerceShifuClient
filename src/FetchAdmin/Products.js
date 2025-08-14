import instance from "../api/axios";

const GetProducts = async () => {
  const response = await fetch(`http://localhost:6060/api/Admin`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = response.json();
  return data;
};

const GetProduct = async (id) => {
  const response = await fetch(`http://localhost:6060/api/Admin/${id}`, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  const data = response.json();
  return data;
};

const GetCompleteProduct = async (Prod) => {
  let ProdString = JSON.stringify(Prod);
  const response = await fetch(`http://localhost:6060/api/Admin/Product`, {
    body: ProdString,
    method: "POST",
    headers: { "content-type": "application/json" },
  });
  const data = response.json();

  return data;
};

// const PostProducts=async  (Prod)=>{
//   let ProdString=JSON.stringify(Prod)
//     const response= await fetch(`http://localhost:5050/api/Admin`,{
//       body:ProdString,
//       method:"POST",
//       headers:{"content-type":"application/json"},
//           });
//           const data=response.json();

//           return data
//   }

const PostEspecificaciones = async (Especificacion) => {
  let ProdString = JSON.stringify(Especificacion);
  console.log(ProdString);
  const response = await fetch(
    `http://localhost:6060/api/Admin/Especificaciones`,
    {
      body: ProdString,
      method: "POST",
      headers: { "content-type": "application/json" },
    }
  );
  const data = response.json();
  // console.log(data)
  return data;
};

// const UploadImgProducts = async (imgFile) => {
//   console.log(imgFile)
//   let ImgString = JSON.stringify(imgFile);
//   const response = await fetch(`http://localhost:6060/api/Admin/AddImg`, {
//     body: ImgString,
//     method: "POST",
//     headers: { "content-type": "application/json" },
//   });
//   const data = response.json();
// // console.log(data)
//   return data;
// };
 const UploadImgProducts = (imgFile) =>
  
  instance.post(`/Admin/AddImg`, imgFile);

const UploadEspecificaciones = async () => {
  // let ProdString=JSON.stringify(data)
  //   const response= await fetch(`http://localhost:5050/api/Admin/Especificaciones`,{
  //     body:ProdString,
  //     method:"PUT",
  //     headers:{"content-type":"application/json"},
  //         });
  //         const res=response.json();
  //         return res
};

// const UploadImage = async (FormData) => {
//   // let ProdString=JSON.stringify(Image)
//   const response = await fetch(`http://localhost:6060/api/Admin/Picture`, {
//     body: FormData,
//     method: "PUT",
//   });
//   const data = response.json();

//   return data;
// };

// const DeleteProducts = async (id) => {
//   console.log(id);
//   // let ProdString=JSON.stringify(id)
//   // console.log(ProdString)
//   const response = await fetch(`http://localhost:5050/api/Admin/Product`, {
//     body: JSON.stringify(id),
//     method: "DELETE",
//   });
//   const data = response.json();
//   return data;
// };
 const DeleteProducts = (id)=> instance.delete(`/Admin/Product/${id}`);

const DeleteEspecificaciones = async (Especificacion) => {
  let ProdString = JSON.stringify(Especificacion);
  const response = await fetch(
    `http://localhost:6060/api/Admin/Especificaciones`,
    {
      body: ProdString,
      method: "DELETE",
      headers: { "content-type": "application/json" },
    }
  );
  const data = response.json();

  return data;
};


const DeleteImage = async (Image) => {
  let ProdString = JSON.stringify(Image);
  const response = await fetch(`http://localhost:6060/api/Admin/Picture`, {
    body: ProdString,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = response.json();

  return data;
};

export {
  GetProducts,
  // PostProducts
  GetProduct,
  GetCompleteProduct,
  PostEspecificaciones,
  // UploadImage,
  DeleteProducts,
  DeleteImage,
  DeleteEspecificaciones,
  UploadImgProducts,
  UploadEspecificaciones,
};
