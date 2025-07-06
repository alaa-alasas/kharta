import Pagination from "react-bootstrap/Pagination";
import "./PaginationCustom.css";
import { getPageNumbers } from "../../commons/getPageNumbers";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationCustom: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange }) => {
  
  //on change page
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  //on click to get prev page
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  //on click to get next page
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination>
      {/* btn for get prev page */}
      <Pagination.Prev onClick={handlePrev} />
      {/* here showing pages number maximum 5  */}
        {getPageNumbers(totalPages,currentPage).map((item, index) => {
          if (item === -1) {
            return (
              <Pagination.Ellipsis
                key={index}
                className="custom-ellipsis"
              />
            );
          } else {
            return (
              <Pagination.Item
                key={index}
                active={item === currentPage}
                onClick={() => handlePageClick(item)}>
                {item}
              </Pagination.Item>
            );
          }
        })}
        {/* btn for get next page */}
      <Pagination.Next onClick={handleNext} />
    </Pagination>
  );
};

export default PaginationCustom;
