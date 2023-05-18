import { mySum } from './myModule.js';

// b)
const sum = mySum(1, 2, 3);
console.log(sum);

// c)
const myArr = [1, 2, 3, 4, 5];

// d)
const result = mySum(...myArr);
console.log(result);

// e)
const mySecondArr = myArr.map((num) => num * 2);

// )f
const average = mySecondArr.reduce((sum, num) => sum + num, 0) / mySecondArr.length;
const filteredArr = mySecondArr.filter((num) => {
  if (num > average) {
    console.log(num);
    return true;
  }
  return false;
});

// g)
setTimeout(() => {
  console.log('Goodbye');
}, 3000);

// h)
const Employee = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  department: 'HR',
  startDate: '2022-01-01',
};

// i)
const { name, email } = Employee;
const Person = { name, email };
