
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SkeletonUi = () => {
  return (
    <div className="productDisplay container text-center mt-3">
      <div className=" d-flex  justify-content-around">
        <figure className="productDisplayImg">
          <Skeleton width={360} height={350} />
        </figure>
        <div className="porductDisplayRight w-50 ">
          <h1 className="mb-3">
            <Skeleton width={450} height={50} direction="rtl" />
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
    </div>
  );
};

export default SkeletonUi;
