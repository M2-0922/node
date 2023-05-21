


//question b

import { mySum } from "./Lab1.js";
console.log(mySum(1,2,3,4,5,6,7,8,9,10));


//question c and d
const myArr = [1,2,3,4,5];

let result =mySum(...myArr);
console.log(result);

//question e

let mySecondArr = myArr.map((num) =>num * 2);
console.log(mySecondArr);

//question f

const average = result / mySecondArr.length;
 
console.log("The average is :"+average);
const filteredArr = mySecondArr.filter((num)=> {
    if (num > average){
        console.log(num);
    }
});

//question g
//my solution
// const myTime = setTimeout(goodBye, 3000);

// function goodBye(){
//     console.log("Good Bye");
// }

//question g another solution

setTimeout(()=> {
    console.log("Good Bye");
},3000)

//question h
const Employee ={
    name: "hikaru maiyaa",
  email: "asdfg.com",
  department: "dishwasher",
  startDate: "2022/10/20",
};

//question i 
const {name,email} = Employee;

const Person ={
    name,
    email,
};

console.log("This is Employee object: ", Employee, "This is person object: ",Person);


  

