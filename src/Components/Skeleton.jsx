
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const SkeletonUi = () => {
  return (
    <>
    <SkeletonTheme>
      <div className=" d-flex flex-column align-items-center flex-md-row">
        <figure>
          <Skeleton duration={0.2} width={350} height={350} />
        </figure>
        <div className=" p-4 w-100 ">
          <h1 className="mb-3">
            <Skeleton  />
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
    </>
  );
};

export default SkeletonUi;
