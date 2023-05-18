export const mySum = (...numbers) => {
    return numbers.reduce((sum,number)=> sum + number,0)
};
console.log(mySum(1,2,3,4));


