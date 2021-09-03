export const paginate = (arr, page, size) => {
  return arr.slice(page * size, (page + 1) * size);
};

export const pagersNumber = (length, size) => {
  return Math.ceil(length / size);
};
