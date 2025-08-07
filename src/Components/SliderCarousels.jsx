import banner4 from "../assets/img/banner4.png";
import banner2 from "../assets/img/banner2.png";
import banner3 from "../assets/img/banner3.png";
import { useProducts } from "../Context/ProductsContext";

function SliderCarousels() {
  const { search } = useProducts();

  return (
    <>
      {!search ? (
        <div
          id="carouselExampleInterval"
          className="carousel slide  "
          data-bs-ride="carousel"
        >
          <div className="carousel-inner bg-body-secondary h-100">
            <div className="carousel-item active h-100" data-bs-interval="5000">
              <img
                src={banner4}
                className="d-block h-100 img-fluid w-100 "
                alt={banner4}
              />
            </div>
            <div className="carousel-item h-100 w-100" data-bs-interval="5000">
              <img
                src={banner2}
                className="d-block h-100 img-fluid w-100"
                alt={banner2}
              />
            </div>
            <div className="carousel-item h-100" data-bs-interval="5000">
              <img
                src={banner3}
                className="d-block  h-100 img-fluid w-100"
                alt={banner3}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-body-secondary p-4 rounded-circle "
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-body-secondary p-4 rounded-circle "
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : null}
      {/* <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={bannerPrueba} className="d-block w-100" alt={bannerPrueba} />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={bannerPrueba} className="d-block w-100" alt={bannerPrueba}/>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="..." className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div> */}
      {/* <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={banner2} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div> */}
    </>
  );
}

export default SliderCarousels;
