//module.exports
const Calculator = require("./test-module-1");
const calc1 = new Calculator();

console.log(calc1.add(3, 4));

//exports
const calc2 = require("./test-module-2");
console.log(calc2.add(2, 9));

//exports WITH destructuring
const { add, multiply } = require("./test-module-2");
console.log(multiply(2, 9));

const myFunc = require("./test-modules-4");
console.log(myFunc.getYear());

//caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
