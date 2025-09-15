import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProducts } from "../Context/ProductsContext";
import { useShopping } from "../Context/ShoppingContext";

const SkeletonUi = () => {
  const { spinnerCar } = useShopping();
  return (
    <>
      {!spinnerCar ? (
        <SkeletonTheme>
          <div className=" d-flex flex-column align-items-center justify-content-center gap-3 flex-md-row container">
            <figure className="">
              <Skeleton duration={0.2} width={350} height={350} />
            </figure>
            <div className={`w-100`}>
              <h1 className="mb-3">
                <Skeleton />
              </h1>

              <div className="productDisplayRightPriceLast">
                <Skeleton count={5} />
              </div>
              <div className="productDisplayRightPrice">
                <Skeleton count={3} />
              </div>

              <div className="productDisplayRightTalle d-flex flex-column gap-2">
                <Skeleton />

                <div className="productDisplayRightCantidad">
                  <Skeleton />
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <SkeletonTheme>
          <div className=" d-flex justify-content-center gap-3 container mt-3">
            <div className="rounded p-3 shadow-sm container-md col-lg-7 d-flex justify-content-around align-items-center ">
              <figure className=" rounded-circle">
                <Skeleton duration={0.3} width={50} height={50} />
              </figure>
              <div className=" w-50">
                <h1 className="mb-3">
                  <Skeleton />
                </h1>

                <div className="productDisplayRightPriceLast">
                  <Skeleton count={2} />
                </div>
              </div>
            </div>

            <div className=" col-lg-4  d-flex justify-content-center p-1 rounded shadow-sm  p-lg-0 h-50">
              {" "}
              <div className=" w-50">
                <h1 className="mb-3">
                  <Skeleton />
                </h1>

                <div className="productDisplayRightPriceLast">
                  <Skeleton count={2} />
                </div>
              </div>
            </div>
          </div>
        </SkeletonTheme>
      )}
    </>
  );
};

export default SkeletonUi;
