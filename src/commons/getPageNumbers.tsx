  //this function for showing page number and Ellipsis based on total Pages and current page
  export const getPageNumbers = (totalPages : number,currentPage: number) => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage > 3 && currentPage < totalPages - 1) {
        pageNumbers.push(-1);
        pageNumbers.push(currentPage);
        pageNumbers.push(-1);
      } else {
        if (currentPage <= 3) {
          pageNumbers.push(2, 3, -1, totalPages);
        } else {
          pageNumbers.push(-1, totalPages - 2, totalPages - 1, totalPages);
        }
      }
    }
    return pageNumbers;
  };