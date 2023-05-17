import { mySum } from "./mySum.mjs";

const myArr = [1,2,3,4,5];
const result = mySum(...myArr);
console.log(result); //15

const mySecondArr = myArr.map(value => {
    return value*2;
});
console.log(mySecondArr); //[ 2, 4, 6, 8, 10 ]

const avarageArr = mySum(...mySecondArr) / mySecondArr.length;
console.log(avarageArr); //6

const aboveAgerarge = mySecondArr.filter(function(value) {
    return value > avarageArr;
})
console.log(aboveAgerarge); //[ 8, 10 ]


setTimeout(() => {
    console.log('Goodbye');
}, '3000');


const Employee = {
    name: 'foo',
    email: 'foo@gmail.com',
    department: 'dev',
    startDate: '2000/1/1'
}

const Person = {};
({ name: Person.name, email: Person.email } = Employee);
console.log(Person); //{ name: 'foo', email: 'foo@gmail.com' }