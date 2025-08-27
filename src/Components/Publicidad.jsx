import { Image } from "react-bootstrap"
import publicidadbanner from "../assets/img/publicidadadidas.png";


const Publicidad = () => {
  return (
     <figure className="card w-100 border-0">
                  <img src={publicidadbanner} className="card-img-top " alt={` ${publicidadbanner}`} />
                </figure>
  )
}

export default Publicidad
