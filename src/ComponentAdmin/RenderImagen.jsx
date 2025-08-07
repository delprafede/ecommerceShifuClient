import React, {Component,useState} from 'react';



function PreviewImagen({file}){
    const [preview,setPreview]=useState({})
    if(file){
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.onload= ()=>{
        setPreview(reader.result)
      }
    }
   return(
    <div>
      <img src={preview}  alt={preview.name} style={{width:"300px"}} />
    </div>
   )
  }

  export default PreviewImagen