import { mySum } from "./index";

const myArr = [2,3,4,5,6,7];
const result =mySum(...myArr);

console.log(result);

const mySecondArray = myArr.map ((number) => number * 2);

console.log(mySecondArray);

const sumOfSecondArr = mySecondArray.reduce((acc,number)=> acc + number);

console.log(sumOfSecondArr);

const average = sumOfSecondArr/mySecondArray.length

console.log(average)

const filteredArr = mySecondArray.filter((number)=> number > average);

console.log(filteredArr);

setTimeout(()=>{
    console.log("Goodbye");
},3000);

console.log("timeout set");

const employee = {
    name: "kubi",
    email:"kubilaycamak@gmail.com",
    department:"web-dev",
    startDate:"2022-8-30"
}

console.log(employee.startDate);

const {name, email} = employee;

const person = {name, email};

console.log(person);

