export const DOTS = "...";

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length: length }, (_, index) => start + index);
};

export const usePagination = (currentPage, totalPages) => {
  let paginationUIElements = [];
  const maxPageButtonCount = 5;

  if (totalPages <= maxPageButtonCount) {
    paginationUIElements = range(1, totalPages);
    return paginationUIElements;
  }

  const showLeftDots = currentPage > 3;
  const showRightDots = currentPage < totalPages - 2;

  if (showLeftDots && showRightDots) {
    paginationUIElements = [
      1,
      DOTS,
      ...range(currentPage - 1, currentPage + 1),
      DOTS,
      totalPages,
    ];
  } else if (showLeftDots) {
    paginationUIElements = [
      1,
      DOTS,
      ...range(totalPages - maxPageButtonCount + 2, totalPages),
    ];
  } else if (showRightDots) {
    paginationUIElements = [
      ...range(1, maxPageButtonCount - 1),
      DOTS,
      totalPages,
    ];
  }

  return paginationUIElements;
};
