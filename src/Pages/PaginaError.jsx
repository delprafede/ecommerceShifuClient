import { NavLink } from "react-router-dom";

function PaginaError() {
  return (
    <div>
      <div className="container">
        <div className="row text-center">
          <div className="bg_404">
            <h1 className="cuatrocerocuatro">404</h1>
          </div>
          <div>
            <h3>Parece que ocurrio un error</h3>
            <p>La pagina que buscas no se encuentra disponible</p>
           
             <NavLink to="/"> ⏪Volver al inicio</NavLink>
        
          </div>
        </div>
      </div>
    </div>
             //windows punto para los iconos 
  );
}

export default PaginaError;
