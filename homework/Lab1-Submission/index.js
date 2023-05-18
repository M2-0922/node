// Now it’s time to do some coding. Use Next-Gen JavaScript to complete the following tasks. (note: create variables using let and const only -no var)
// Create an arrow function named “mySum”.
// Your function should accept an arbitrary number of arguments using the REST operator.
// Your function should return the sum of all of its inputs.
import { mySum2 } from "./module.js";

const sum = [2, 3, 4, 1, 2, 3];
const mySum = (...args) => {
  return sum.reduce((acc, curr) => acc + curr, 0);
};
console.log(mySum(2, 3, 4, 1, 2, 3));
console.log(mySum(...sum));

// Put this function in a different module and export it. Then, in this module, import the module that contains your function and call it from this module.
console.log(mySum2(...sum));

// Create an array of numbers named “myArr”. Your array may have any length (try different lengths to test it).
const myArr = [3, 3, 3];
// Call your function passing as arguments the members of myArr array using the SPREAD operator. Assign the result to a “result” variable and console log it.
const result = mySum2(...myArr);
console.log(result);
// Create a new array named “mySecondArr”. Map the contents of your myArr array to mySecondArr array using an anonymous function that multiplies each member of myArr by 2.
const mySecondArr = (myArr) => {
  return myArr.map((arr) => arr * 2);
};
console.log(mySecondArr(myArr));
// Filter the contents of your mySecondArr using an anonymous function that console logs the numbers above average number (you’ll need to find the average first).
const findAboveAve = (myArr) => {
  const aveSum = 0;
  myArr.forEach((item) => {
    aveSum += item;
  });
  aveSum = aveSum / aveSum.length;
  myArr.filter((item) => item > aveSum);
};
console.log(findAboveAve(myArr));

// Use setTimeout() function. Pass it a callback function as a parameter that console logs “Goodbye” after 3 seconds.
// Create an “Employee” object that has the following key-value pairs: “name”, “email”, “department” and “startDate”.
