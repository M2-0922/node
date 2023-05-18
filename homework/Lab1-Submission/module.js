const sum = [2, 3, 4, 1, 2, 3];
export const mySum2 = (...args) => {
  return sum.reduce((acc, curr) => acc + curr, 0);
};
