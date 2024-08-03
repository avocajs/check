# @avocajs/check

`@avocajs/check` is a utility library that provides a comprehensive set of methods to perform type checks, validations, and various other utility functions in JavaScript. This library helps ensure your code is robust and error-free by simplifying common validation tasks.

## Installation

To install `@avocajs/check`, use npm:

```bash
npm install @avocajs/check
```

## Importing

### CommonJS

```javascript
const { Check } = require("@avocajs/check");
```

### ES6 Modules

```javascript
import { Check } from "@avocajs/check";
```

## Getting Started

Here's a quick example to get you started:

### Example: Checking Data Types

```javascript
const { Check } = require("@avocajs/check");

// Check if a value is a finite number
console.log(Check.isFinite(100)); // true
console.log(Check.isFinite(Infinity)); // false

// Check if a value is a function
console.log(Check.isFunction(function () {})); // true
console.log(Check.isFunction(123)); // false

// Check if a value is a string
console.log(Check.isText("Hello World")); // true
console.log(Check.isText(123)); // false

// Check if a value is a non-empty text
console.log(Check.isNonEmptyText("Hello")); // true
console.log(Check.isNonEmptyText("")); // false
```

### Example: Validating Complex Structures

```javascript
const { Check } = require("@avocajs/check");

// Check if a value is a Pending Promise!
const pendingPromise = new Promise(() => {}); // A pending promise
Check.isPending(pendingPromise).then((r) => console.log(r)); // true

// Check if a value is a promise
console.log(Check.isPromise(Promise.resolve())); // true
console.log(Check.isPromise({})); // false

// Check if a regular expression has a specific flag
const regex = /test/i;
console.log(Check.hasFlag(regex, "i")); // true
console.log(Check.hasFlag(regex, "g")); // false
```

## Usage Examples

### `is(value: any, type: _Type): boolean`

Checks if a value matches a specific type.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.is(123, "number")); // true
console.log(Check.is("Hello", "string")); // true
console.log(Check.is([], "array")); // true
console.log(Check.is({}, "object")); // true
```

### `type(value: any): _Type`

Returns the type of the given value.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.type(123)); // 'number'
console.log(Check.type("Hello")); // 'string'
console.log(Check.type([])); // 'array'
console.log(Check.type({})); // 'object'
```

### `isObject(value: any): boolean`

Checks if a value is an object.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isObject({})); // true
console.log(Check.isObject([])); // false
console.log(Check.isObject(null)); // false
console.log(Check.isObject(123)); // false
```

### `isObjectLike(value: any): boolean`

Checks if a value is object-like (not null and of type 'object').

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isObjectLike({})); // true
console.log(Check.isObjectLike([])); // true
console.log(Check.isObjectLike(null)); // false
console.log(Check.isObjectLike(123)); // false
```

### `isEmptyObject(value: any): boolean`

Checks if an object is empty.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isEmptyObject({})); // true
console.log(Check.isEmptyObject({ a: 1 })); // false
console.log(Check.isEmptyObject([])); // false
console.log(Check.isEmptyObject(null)); // false
```

### `isNonEmptyObject(value: any): boolean`

Checks if an object is not empty.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNonEmptyObject({})); // false
console.log(Check.isNonEmptyObject({ a: 1 })); // true
console.log(Check.isNonEmptyObject([])); // true
console.log(Check.isNonEmptyObject(null)); // false
```

### `ownProp(object: object, property: string): boolean`

Checks if an object has a specific property as its own (not inherited).

```javascript
const { Check } = require("@avocajs/check");

class Parent {
  parentProp = undefined;
}

class Child extends Parent {
  childProp = undefined;
}

Check.ownProp(new Child(), "parentProp"); // false
Check.ownProp(new Child(), "childProp"); // true
```

### `ownProps(object: object, properties: string[]): boolean`

Checks if an object has all specified properties as its own (not inherited).

```javascript
const { Check } = require("@avocajs/check");

const obj = { a: 1, b: 2 };
console.log(Check.ownProps(obj, ["a", "b"])); // true
console.log(Check.ownProps(obj, ["a", "c"])); // false
console.log(Check.ownProps({}, ["toString"])); // false
```

### `hasProp(object: object, property: string): boolean`

Checks if an object has a specific property (own or inherited).

```javascript
const { Check } = require("@avocajs/check");

class Parent {
  parentProp = undefined;
}

class Child extends Parent {
  childProp = undefined;
}

Check.hasProp(new Child(), "parentProp"); // true
Check.hasProp(new Child(), "childProp"); // true
```

### `hasProps(object: object, properties: string[]): boolean`

Checks if an object has all specified properties (own or inherited).

```javascript
const { Check } = require("@avocajs/check");

const obj = { a: 1, b: 2 };
console.log(Check.hasProps(obj, ["a", "b"])); // true
console.log(Check.hasProps(obj, ["a", "toString"])); // true
console.log(Check.hasProps(obj, ["a", "c"])); // false
```

### `hasLength(target: any, length: number): boolean`

Checks if a value has a specific length.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.hasLength([1, 2, 3], 3)); // true
console.log(Check.hasLength("abc", 3)); // true
console.log(Check.hasLength({ length: 2 }, 2)); // true
console.log(Check.hasLength([], 1)); // false
```

### `isArray(value: any): boolean`

Checks if a value is an array.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isArray([])); // true
console.log(Check.isArray({})); // false
console.log(Check.isArray("abc")); // false
console.log(Check.isArray(123)); // false
```

### `isEmptyArray(value: any): boolean`

Checks if an array is empty.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isEmptyArray([])); // true
console.log(Check.isEmptyArray([1])); // false
console.log(Check.isEmptyArray({})); // false
console.log(Check.isEmptyArray("abc")); // false
```

### `isNonEmptyArray(value: any): boolean`

Checks if an array is not empty.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNonEmptyArray([])); // false
console.log(Check.isNonEmptyArray([1])); // true
console.log(Check.isNonEmptyArray({})); // false
console.log(Check.isNonEmptyArray("abc")); // false
```

### `isArrayOf(array: Array<any>, type: _Type): boolean`

Checks if all elements in an array are of a specific type.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isArrayOf([1, 2, 3], "number")); // true
console.log(Check.isArrayOf(["a", "b"], "string")); // true
console.log(Check.isArrayOf([1, "a"], "number")); // false
console.log(Check.isArrayOf([], "number")); // true
```

### `isIterable(value: any): boolean`

Checks if a value is iterable.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isIterable([])); // true
console.log(Check.isIterable("abc")); // true
console.log(Check.isIterable({})); // false
console.log(Check.isIterable(123)); // false
```

### `hasIndex(target: Array<any> | string, index: number): boolean`

Checks if an array or string has a specific index.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.hasIndex([1, 2, 3], 1)); // true
console.log(Check.hasIndex("abc", 2)); // true
console.log(Check.hasIndex([], 1)); // false
console.log(Check.hasIndex("abc", 3)); // false
```

### `isNumber(value: any): boolean`

Checks if a value is a number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNumber(123)); // true
console.log(Check.isNumber("123")); // false
console.log(Check.isNumber(NaN)); // false
console.log(Check.isNumber(Infinity)); // false
```

### `isInteger(value: any): boolean`

Checks if a value is an integer.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isInteger(123)); // true
console.log(Check.isInteger(123.45)); // false
console.log(Check.isInteger("123")); // false
console.log(Check.isInteger(Infinity)); // false
```

### `isFloat(value: any): boolean`

Checks if a value is a float (number with decimals).

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isFloat(123.45)); // true
console.log(Check.isFloat(123)); // false
console.log(Check.isFloat("123.45")); // false
console.log(Check.isFloat(Infinity)); // false
```

### `isEven(value: number): boolean`

Checks if a number is even.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isEven(4)); // true
console.log(Check.isEven(3)); // false
console.log(Check.isEven(0)); // true
console.log(Check.isEven(-2)); // true
```

### `isOdd(value: number): boolean`

Checks if a number is odd.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isOdd(3)); // true
console.log(Check.isOdd(4)); // false
console.log(Check.isOdd(1)); // true
console.log(Check.isOdd(-3)); // true
```

### `isBetween(number: number, min: number, max: number): boolean`

Checks if a number is between two values (inclusive).

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isBetween(5, 1, 10)); // true
console.log(Check.isBetween(0, 1, 10)); // false
console.log(Check.isBetween(10, 1, 10)); // true
console.log(Check.isBetween(15, 1, 10)); // false
```

### `isLessThan(compare: number, to: number): boolean`

Checks if a number is less than another number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isLessThan(5, 10)); // true
console.log(Check.isLessThan(10, 10)); // false
console.log(Check.isLessThan(15, 10)); // false
console.log(Check.isLessThan(5, 0)); // false
```

### `isLessThanOrEqual(compare: number, to: number): boolean`

Checks if a number is less than or equal to another number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isLessThanOrEqual(5, 10)); // true
console.log(Check.isLessThanOrEqual(10, 10)); // true
console.log(Check.isLessThanOrEqual(15, 10)); // false
console.log(Check.isLessThanOrEqual(5, 0)); // false
```

### `isGreaterThan(compare: number, to: number): boolean`

Checks if a number is greater than another number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isGreaterThan(15, 10)); // true
console.log(Check.isGreaterThan(10, 10)); // false
console.log(Check.isGreaterThan(5, 10)); // false
console.log(Check.isGreaterThan(5, 0)); // true
```

### `isGreaterThanOrEqual(compare: number, to: number): boolean`

Checks if a number is greater than or equal to another number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isGreaterThanOrEqual(15, 10)); // true
console.log(Check.isGreaterThanOrEqual(10, 10)); // true
console.log(Check.isGreaterThanOrEqual(5, 10)); // false
console.log(Check.isGreaterThanOrEqual(5, 0)); // true
```

### `isNegativeInfinity(value: any): boolean`

Checks if a value is negative infinity.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNegativeInfinity(-Infinity)); // true
console.log(Check.isNegativeInfinity(Infinity)); // false
console.log(Check.isNegativeInfinity(NaN)); // false
console.log(Check.isNegativeInfinity(123)); // false
```

### `isInfinity(value: any): boolean`

Checks if a value is positive infinity.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isInfinity(Infinity)); // true
console.log(Check.isInfinity(-Infinity)); // false
console.log(Check.isInfinity(NaN)); // false
console.log(Check.isInfinity(123)); // false
```

### `isFinite(value: any): boolean`

Checks if a value is a finite number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isFinite(123)); // true
console.log(Check.isFinite(Infinity)); // false
console.log(Check.isFinite(-Infinity)); // false
console.log(Check.isFinite(NaN)); // false
```

### `isFunction(value: any): boolean`

Checks if a value is a function.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isFunction(function () {})); // true
console.log(Check.isFunction(() => {})); // true
console.log(Check.isFunction(123)); // false
console.log(Check.isFunction("function")); // false
```

### `isAsyncFunction(value: any): boolean`

Checks if a value is an async function.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isAsyncFunction(async function () {})); // true
console.log(Check.isAsyncFunction(() => {})); // false
console.log(Check.isAsyncFunction(123)); // false
console.log(Check.isAsyncFunction("async function")); // false
```

### `isText(value: any): boolean`

Checks if a value is a string.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isText("Hello")); // true
console.log(Check.isText(123)); // false
console.log(Check.isText({})); // false
console.log(Check.isText([])); // false
```

### `isString(value: any): boolean`

Checks if a value is a string.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isString("Hello")); // true
console.log(Check.isString(123)); // false
console.log(Check.isString({})); // false
console.log(Check.isString([])); // false
```

### `isEmptyText(value: any): boolean`

Checks if a value is an empty string.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isEmptyText("")); // true
console.log(Check.isEmptyText("Hello")); // false
console.log(Check.isEmptyText(123)); // false
console.log(Check.isEmptyText({})); // false
```

### `isNonEmptyText(value: any): boolean`

Checks if a value is a non-empty string.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNonEmptyText("Hello")); // true
console.log(Check.isNonEmptyText("")); // false
console.log(Check.isNonEmptyText("   ")); // false
console.log(Check.isNonEmptyText({})); // false
```

### `isSymbol(value: any): boolean`

Checks if a value is a symbol.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isSymbol(Symbol("symbol"))); // true
console.log(Check.isSymbol("symbol")); // false
console.log(Check.isSymbol(123)); // false
console.log(Check.isSymbol({})); // false
```

### `isBoolean(value: any): boolean`

Checks if a value is a boolean.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isBoolean(true)); // true
console.log(Check.isBoolean(false)); // true
console.log(Check.isBoolean(0)); // false
console.log(Check.isBoolean("true")); // false
```

### `isTruthy(value: any): boolean`

Checks if a value is truthy.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isTruthy(true)); // true
console.log(Check.isTruthy(1)); // true
console.log(Check.isTruthy("hello")); // true
console.log(Check.isTruthy(0)); // false
```

### `isFalsy(value: any): boolean`

Checks if a value is falsy.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isFalsy(false)); // true
console.log(Check.isFalsy(0)); // true
console.log(Check.isFalsy("")); // true
console.log(Check.isFalsy(1)); // false
```

### `isNull(value: any): boolean`

Checks if a value is null.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNull(null)); // true
console.log(Check.isNull(undefined)); // false
console.log(Check.isNull(0)); // false
console.log(Check.isNull("")); // false
```

### `isNaN(value: any): boolean`

Checks if a value is NaN (Not-a-Number).

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isNaN(NaN)); // true
console.log(Check.isNaN(123)); // false
console.log(Check.isNaN("hello")); // false
console.log(Check.isNaN(undefined)); // false
```

### `isUndefined(value: any): boolean`

Checks if a value is undefined.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isUndefined(undefined)); // true
console.log(Check.isUndefined(null)); // false
console.log(Check.isUndefined(0)); // false
console.log(Check.isUndefined("")); // false
```

### `isDefined(value: any): boolean`

Checks if a value is defined.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isDefined(123)); // true
console.log(Check.isDefined(null)); // true
console.log(Check.isDefined(undefined)); // false
console.log(Check.isDefined("")); // true
```

### `isDefinedStrict(value: any): boolean`

Checks if a value is defined and not null.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isDefinedStrict(123)); // true
console.log(Check.isDefinedStrict(null)); // false
console.log(Check.isDefinedStrict(undefined)); // false
console.log(Check.isDefinedStrict("")); // true
```

### `isPromise(value: any): boolean`

Checks if a value is a promise.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isPromise(Promise.resolve())); // true
console.log(Check.isPromise({ then: () => {} })); // false
console.log(Check.isPromise(123)); // false
console.log(Check.isPromise("promise")); // false
```

### `isPending(promise: Promise<any>): Promise<boolean>`

Checks if a promise is pending.

```javascript
const { Check } = require("@avocajs/check");

const pendingPromise = new Promise(() => {}); // Pending Promise
Check.isPending(pendingPromise).then((r) => console.log(r)); // true

const resolvedPromise = Promise.resolve();
Check.isPending(resolvedPromise).then((r) => console.log(r)); // false
```

### `isDate(value: any): boolean`

Checks if a value is a date object.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isDate(new Date())); // true
console.log(Check.isDate(Date.now())); // false
console.log(Check.isDate("2023-01-01")); // false
console.log(Check.isDate({})); // false
```

### `isMap(value: any): boolean`

Checks if a value is a Map object.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isMap(new Map())); // true
console.log(Check.isMap({})); // false
console.log(Check.isMap([])); // false
console.log(Check.isMap("map")); // false
```

### `isRegExp(value: any): boolean`

Checks if a value is a regular expression.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isRegExp(/regex/)); // true
console.log(Check.isRegExp(new RegExp("regex"))); // true
console.log(Check.isRegExp("regex")); // false
console.log(Check.isRegExp({})); // false
```

### `hasFlag(regex: RegExp, flag: string): boolean`

Checks if a regular expression has a specific flag.

```javascript
const { Check } = require("@avocajs/check");

const regex = /hello/i;
console.log(Check.hasFlag(regex, "i")); // true
console.log(Check.hasFlag(regex, "g")); // false
```

### `_isPropName(expression: string): boolean`

Checks if a string is a valid property name.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isPropName("validProp")); // true
console.log(Check._isPropName("123")); // false
console.log(Check._isPropName("$prop")); // true
console.log(Check._isPropName("prop-name")); // false
```

### `_isNumber(expression: string): boolean`

Checks if a string is a valid number.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isNumber("123")); // true
console.log(Check._isNumber("123.45")); // true
console.log(Check._isNumber("abc")); // false
console.log(Check._isNumber("")); // false
```

### `_isInteger(expression: string): boolean`

Checks if a string is a valid integer.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isInteger("123")); // true
console.log(Check._isInteger("123.45")); // false
console.log(Check._isInteger("abc")); // false
console.log(Check._isInteger("")); // false
```

### `_isFloat(expression: string): boolean`

Checks if a string is a valid float.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isFloat("123.45")); // true
console.log(Check._isFloat("123")); // false
console.log(Check._isFloat("abc")); // false
console.log(Check._isFloat("")); // false
```

### `_isText(expression: string): boolean`

Checks if a string is valid string.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isText("hello")); // true
console.log(Check._isText("")); // true
console.log(Check._isText("123")); // true
console.log(Check._isText({})); // false
```

### `_isDotNotation(expression: string): boolean`

Checks if a string is a valid dot notation.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isDotNotation("object.property")); // true
console.log(Check._isDotNotation("object['property']")); // false
console.log(Check._isDotNotation("object.property.subproperty")); // true
console.log(Check._isDotNotation("object['property.subproperty']")); // false
```

### `_isBracketNotation(expression: string): boolean`

Checks if a string is a valid bracket notation.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isBracketNotation("object[11]")); // true
console.log(Check._isBracketNotation("object.property")); // false
console.log(Check._isBracketNotation("object[0][1]")); // true
console.log(Check._isBracketNotation("object.property.subproperty")); // false
```

### `_isNotation(expression: string): boolean`

Checks if a string is a valid dot or bracket notation.

```javascript
const { Check } = require("@avocajs/check");

console.log(Check._isNotation("object.property[0]")); // true
console.log(Check._isNotation("object[0][9]")); // true
console.log(Check._isNotation("object.property.subproperty")); // true
console.log(Check._isNotation("object[0].property")); // true
```

### `isEncoding(value: string): boolean`

Checks if a string is a valid encoding type (e.g., 'utf-8').

```javascript
const { Check } = require("@avocajs/check");

console.log(Check.isEncoding("utf-8")); // true
console.log(Check.isEncoding("ascii")); // true
console.log(Check.isEncoding("base64")); // true
console.log(Check.isEncoding("invalid-encoding")); // false
```

### `isClass(value: any): boolean`

Checks if a value is a class.

```javascript
const { Check } = require("@avocajs/check");

class MyClass {}
console.log(Check.isClass(MyClass)); // true
console.log(Check.isClass(function () {})); // false
console.log(Check.isClass({})); // false
console.log(Check.isClass("class")); // false
```

### `isChildOf(child: any, parent: any): boolean`

Checks if a class is a child (subclass) of another class.

```javascript
const { Check } = require("@avocajs/check");

class Parent {}
class Child extends Parent {}

console.log(Check.isChildOf(Child, Parent)); // true
console.log(Check.isChildOf(Parent, Child)); // false
console.log(Check.isChildOf(Child, Object)); // true
console.log(Check.isChildOf(Parent, Object)); // true
```

### `isError(value: any, type?: any): boolean`

Checks if a value is an error object, optionally of a specific type.

```javascript
const { Check } = require("@avocajs/check");
class TypeError extends Error {}

console.log(Check.isError(new Error())); // true
console.log(Check.isError(new TypeError())); // true

// You can even check the type of the error instance
console.log(Check.isError(new TypeError(), TypeError)); // true
console.log(Check.isError(new TypeError(), Error)); // true
console.log(Check.isError(new Error(), TypeError)); // false
```

### `hasMessage(error: Error): boolean`

Checks if an error object has a message.

```javascript
const { Check } = require("@avocajs/check");

const error = new Error("Something went wrong");
console.log(Check.hasMessage(error)); // true

const errorWithoutMessage = new Error();
errorWithoutMessage.message = "";
console.log(Check.hasMessage(errorWithoutMessage)); // false
```

### `hasName(error: Error): boolean`

Checks if an error object has a name.

```javascript
const { Check } = require("@avocajs/check");

const error = new Error();
console.log(Check.hasName(error)); // true

const customError = new Error();
customError.name = "";
console.log(Check.hasName(customError)); // false
```

### `areFunctions(...values: Array<any>): boolean`

Checks if all provided values are functions.

```javascript
const { Check } = require("@avocajs/check");

// Example 1: All values are functions
const func1 = () => {};
const func2 = function () {};
console.log(Check.areFunctions(func1, func2)); // true

// Example 2: Not all values are functions
const notAFunction = 123;
console.log(Check.areFunctions(func1, notAFunction)); // false

// Example 3: Empty input
console.log(Check.areFunctions()); // false (no values provided)
```

### `areDefined(...values: Array<any>): boolean`

Checks if all provided values are not `undefined`.

```javascript
const { Check } = require("@avocajs/check");

// Example 1: All values are defined
const value1 = 42;
const value2 = "hello";
console.log(Check.areDefined(value1, value2)); // true

// Example 2: Some values are undefined
const undefinedValue = undefined;
console.log(Check.areDefined(value1, undefinedValue)); // false

// Example 3: Empty input
console.log(Check.areDefined()); // false (no values provided)
```
