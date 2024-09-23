export const generateArray = (length: number) => {
  const genereatedArray = Array.from({ length }, (_, index) => index + 1);

  return genereatedArray;
};
