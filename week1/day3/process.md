`process.argv` is a property in Node.js that provides access to the command-line arguments passed when running a Node.js script. It is an array that contains the command-line arguments, where the first element is the path to the Node.js executable, the second element is the path to the script being executed, and the subsequent elements are the command-line arguments passed by the user.

Here's an example of how to use process.argv:

```javascript
// Example script: greet.js

// Get the command-line arguments
const args = process.argv;

// Check if a name is provided as an argument
if (args.length > 2) {
  const name = args[2];
  console.log(`Hello, ${name}!`);
} else {
  console.log('Hello, anonymous!');
}
```

If you run the script from the command line with an argument, it will greet the provided name. Otherwise, it will greet as "anonymous". For example:

```shell
$ node greet.js John
Hello, John!
```

```shell
$ node greet.js
Hello, anonymous!
```

In the first example, the command-line argument `"John"` is passed and accessed using `process.argv[2]`. The script then prints `"Hello, John!"` to the console. In the second example, no command-line arguments are provided, so it defaults to printing `"Hello, anonymous!"`.