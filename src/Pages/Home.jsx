import ProductsList from "../Components/ProductsList";
import IndividualIntervalsExample from "../Components/SliderCarousels";

const Home = () => {
  return (
    <>
      <div>
        <div className="">
          <IndividualIntervalsExample />
        </div>
        <div className=" container-fluid d-flex flex-column align-items-center mt-2">
          <ProductsList />
        </div>
      </div>
    </>
  );
};

export default Home;
