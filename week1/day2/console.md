`console.log`: The most commonly used method in console, console.log is used to log messages to the console. You can pass in any value or variable as an argument, and it will be displayed in the console output.
```javascript
const name = 'John';
console.log('Hello,', name);
```
`console.error`: This method is used to log error messages to the console. It is similar to console.log, but the output is typically displayed in a different color or with an error indicator.
```javascript
console.error('Something went wrong!');
```

`console.warn`: Similar to console.error, console.warn is used to log warning messages to the console. The output may have a different color or a warning indicator.
```javascript
console.warn('This is a warning!');
```
`console.info`: console.info is used to log informational messages to the console. It is similar to console.log, but the output is typically displayed with an info indicator or in a different color.
```javascript
console.info('This is an information message.');
```
`console.table`: The console.table method is used to display tabular data in a formatted table in the console. It takes an array or an object as an argument and formats it into a table.
```javascript
const data = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 }
];

console.table(data);
```
`console.time` and `console.timeEnd`: These methods are used to measure the execution time of a particular operation. Use console.time to start a timer and console.timeEnd to stop it and display the elapsed time in milliseconds.
```javascript
console.time('myTimer');
// Code block or operation to measure
console.timeEnd('myTimer');
```

`console.trace`: The console.trace method is used to log a stack trace to the console. It prints the current stack trace, showing the function calls that led to the point where console.trace is called.
```javascript
function foo() {
  console.trace('Trace this');
}

function bar() {
  foo();
}

bar();
```
These are just a few examples of the useful methods available in console. Experimenting with these methods and exploring the Node.js documentation will help you uncover even more ways to leverage the debugging and logging capabilities of console.