/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Pagination = ({
  pageNumber,
  currentPage,
  setCurrentPage,
  totalProducts,

}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / pageNumber); i++) {
    pageNumbers.push(i);
  }
  const onPrevioPage = () => {
    setCurrentPage(currentPage - 1);
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onSpecificPage = (e) => {
    setCurrentPage(e);
  };
   const scrollToTop = () => {
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    }
  
  return (
    <div className=" container ">
      <div aria-label="..." className="d-flex justify-content-around ">
        <button
          className={` page-link pagination page-item cursor rounded-start-2 ${
            currentPage === 1 ? "disabled " : ""
          }`}
          onClick={onPrevioPage}
        >
          Anterior
        </button>

        <button
          className={`page-link page-item pagination cursor order-2  rounded-end-2 cursor ${
            currentPage >= pageNumbers.length ? "disabled " : ""
          }`}
          onClick={onNextPage}
        >
          Siguiente
        </button>
        <ul className="pagination mb-0 cursor order-1 d-flex  gap-3 ">
          {pageNumbers.map((numberPage) => {
            return (
              <li key={numberPage} className="page-item cursor">
                <a
                  onClick={() => {
                    onSpecificPage(numberPage);
                  scrollToTop();
                  }}
                  className={`page-link ${
                    numberPage === currentPage ? "active" : " "
                  } pointer`}
                >
                  {numberPage}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
