import { Image } from "react-bootstrap"
import publicidadbanner from "../assets/img/publicidadbanner.gif";


const Publicidad = () => {
  return (
    <div>
      <h1>Hola Publicidad</h1>
      <Image src={publicidadbanner} className=" w-100 imgPublicidad" />
    </div>
  )
}

export default Publicidad
