# @AvocaJS/Check

![npm](https://img.shields.io/npm/v/@avocajs/check)
![license](https://img.shields.io/npm/l/@avocajs/check)
![downloads](https://img.shields.io/npm/dw/@avocajs/check)

`@AvocaJS/Check` is a utility library designed to provide a set of common validation and checking functions to enhance your JavaScript and TypeScript projects. This package is part of the AvocaJS suite, which aims to offer modular and reusable components for streamlined development.

## Features

- **Type Checks:** Validate types such as strings, numbers, arrays, and objects.
- **Value Checks:** Check for specific value conditions like empty arrays or specific properties.
- **Number Utilities:** Functions to check numerical properties and conditions.

## Installation

Install `@avocajs/check` using npm:

```bash
npm install @avocajs/check
```

## Usage

Here's how to use `@avocajs/check` in your project:

### Importing

```typescript
import { Check } from "@avocajs/check";
```

### Examples

#### Type Checks

```typescript
console.log(Check.isText("Hello")); // true
console.log(Check.isText(123)); // false
```

#### Value Checks

```typescript
console.log(Check.isEmptyArray([])); // true
console.log(Check.isEmptyArray([1, 2, 3])); // false
```

#### Number Utilities

```typescript
console.log(Check.isEven(2)); // true
console.log(Check.isOdd(3)); // true
console.log(Check.isBetween(5, 1, 10)); // true
console.log(Check.isBetweenStrict(5, 1, 10)); // true
```

## API Reference

# API Reference for `Check` Class

#### `Check.is(value: string): boolean`

Checks if the given value is a valid type.

- **Parameters:**

  - `value` (string): The type to check against valid types.

- **Returns:** `boolean` - Returns `true` if the type is valid; otherwise, `false`.

---

#### `Check.type(value: any): _Type`

Determines the type of the given value.

- **Parameters:**

  - `value` (any): The value whose type is to be determined.

- **Returns:** `_Type` - Returns the type of the value as a string.

---

#### `Check.isObject(value: any): boolean`

Checks if the given value is an object (excluding arrays).

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an object; otherwise, `false`.

---

#### `Check.isObjectLike(value: any): boolean`

Checks if the given value is either an object or an array.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an object or array; otherwise, `false`.

---

#### `Check.isEmptyObject(value: any): boolean`

Checks if the given object is empty (has no own properties).

- **Parameters:**

  - `value` (any): The object to check.

- **Returns:** `boolean` - Returns `true` if the object is empty; otherwise, `false`.

---

#### `Check.isNonEmptyObject(value: any): boolean`

Checks if the given object is not empty (has at least one own property).

- **Parameters:**

  - `value` (any): The object to check.

- **Returns:** `boolean` - Returns `true` if the object is not empty; otherwise, `false`.

---

#### `Check.ownProp(object: object, property: string): boolean`

Checks if the given object has a specific own property.

- **Parameters:**

  - `object` (object): The object to check.
  - `property` (string): The property to check for.

- **Returns:** `boolean` - Returns `true` if the object has the own property; otherwise, `false`.

---

#### `Check.ownProps(object: object, properties: string[]): boolean`

Checks if the given object has all the specified own properties.

- **Parameters:**

  - `object` (object): The object to check.
  - `properties` (string[]): The properties to check for.

- **Returns:** `boolean` - Returns `true` if the object has all the own properties; otherwise, `false`.

---

#### `Check.hasProp(object: object, property: string): boolean`

Checks if the given object has a specific property (own or inherited).

- **Parameters:**

  - `object` (object): The object to check.
  - `property` (string): The property to check for.

- **Returns:** `boolean` - Returns `true` if the object has the property; otherwise, `false`.

---

#### `Check.hasProps(object: object, properties: string[]): boolean`

Checks if the given object has all the specified properties (own or inherited).

- **Parameters:**

  - `object` (object): The object to check.
  - `properties` (string[]): The properties to check for.

- **Returns:** `boolean` - Returns `true` if the object has all the properties; otherwise, `false`.

---

#### `Check.hasLength(target: Object | Array<any> | string, length: number): boolean`

Checks if the given target (object, array, or string) has a specific length.

- **Parameters:**

  - `target` (Object | Array<any> | string): The target to check.
  - `length` (number): The length to check for.

- **Returns:** `boolean` - Returns `true` if the target has the specified length; otherwise, `false`.

---

#### `Check.isArray(value: any): boolean`

Checks if the given value is an array.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an array; otherwise, `false`.

---

#### `Check.isEmptyArray(value: any): boolean`

Checks if the given value is an empty array.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an empty array; otherwise, `false`.

---

#### `Check.isNonEmptyArray(value: any): boolean`

Checks if the given value is a non-empty array.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a non-empty array; otherwise, `false`.

---

#### `Check.isArrayOf(array: Array<any>, type: _Type): boolean`

Checks if the given array contains elements of a specific type.

- **Parameters:**

  - `array` (Array<any>): The array to check.
  - `type` (\_Type): The type to check for.

- **Returns:** `boolean` - Returns `true` if all elements in the array are of the specified type; otherwise, `false`.

---

#### `Check.isIterable(value: any): boolean`

Checks if the given value is iterable.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is iterable; otherwise, `false`.

---

#### `Check.hasIndex(target: Array<any> | string, index: number): boolean`

Checks if the given array or string has an element at a specific index.

- **Parameters:**

  - `target` (Array<any> | string): The array or string to check.
  - `index` (number): The index to check for.

- **Returns:** `boolean` - Returns `true` if the target has an element at the specified index; otherwise, `false`.

---

#### `Check.isNumber(value: any): boolean`

Checks if the given value is a number.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a number; otherwise, `false`.

---

#### `Check.isInteger(value: any): boolean`

Checks if the given value is an integer.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an integer; otherwise, `false`.

---

#### `Check.isFloat(value: any): boolean`

Checks if the given value is a floating-point number.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a floating-point number; otherwise, `false`.

---

#### `Check.isEven(value: number): boolean`

Checks if the given number is even.

- **Parameters:**

  - `value` (number): The number to check.

- **Returns:** `boolean` - Returns `true` if the number is even; otherwise, `false`.

---

#### `Check.isOdd(value: number): boolean`

Checks if the given number is odd.

- **Parameters:**

  - `value` (number): The number to check.

- **Returns:** `boolean` - Returns `true` if the number is odd; otherwise, `false`.

---

#### `Check.isBetween(number: number, min: number, max: number): boolean`

Checks if the given number is within a specified range (inclusive).

- **Parameters:**

  - `number` (number): The number to check.
  - `min` (number): The minimum value of the range.
  - `max` (number): The maximum value of the range.

- **Returns:** `boolean` - Returns `true` if the number is between min and max (inclusive); otherwise, `false`.

---

#### `Check.isBetweenStrict(number: number, min: number, max: number): boolean`

Checks if the given number is within a specified range (exclusive).

- **Parameters:**

  - `number` (number): The number to check.
  - `min` (number): The minimum value of the range.
  - `max` (number): The maximum value of the range.

- **Returns:** `boolean` - Returns `true` if the number is strictly between min and max; otherwise, `false`.

---

#### `Check.isLessThan(compare: number, to: number): boolean`

Checks if a number is less than another number.

- **Parameters:**

  - `compare` (number): The number to compare.
  - `to` (number): The number to compare against.

- **Returns:** `boolean` - Returns `true` if `compare` is less than `to`; otherwise, `false`.

---

#### `Check.isLessThanOrEqual(compare: number, to: number): boolean`

Checks if a number is less than or equal to another number.

- **Parameters:**

  - `compare` (number): The number to compare.
  - `to` (number): The number to compare against.

- **Returns:** `boolean` - Returns `true` if `compare` is less than or equal to `to`; otherwise, `false`.

---

#### `Check.isGreaterThan(compare: number, to: number): boolean`

Checks if a number is greater than another number.

- **Parameters:**

  - `compare` (number): The number to compare.
  - `to` (number): The number to compare against.

- **Returns:** `boolean` - Returns `true` if `compare` is greater than `to`; otherwise, `false`.

---

#### `Check.isGreaterThanOrEqual(compare: number, to: number): boolean`

Checks if a number is greater than or equal to another number.

- **Parameters:**

  - `compare` (number): The number to compare.
  - `to` (number): The number to compare against.

- **Returns:** `boolean` - Returns `true` if `compare` is greater than or equal to `to`; otherwise, `false`.

---

#### `Check.isNegativeInfinity(value: any): boolean`

Checks if the given value is negative infinity.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is negative infinity; otherwise, `false`.

---

#### `Check.isInfinity(value: any): boolean`

Checks if the given value is infinity.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is infinity; otherwise, `false`.

---

#### `Check.isFinite(value: any): boolean`

Checks if the given value is a finite number.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is finite; otherwise, `false`.

---

#### `Check.isFunction(value: any): boolean`

Checks if the given value is a function.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a function; otherwise, `false`.

---

#### `Check.isAsyncFunction(value: any): boolean`

Checks if the given value is an async function.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is an async function; otherwise, `false`.

---

#### `Check.isText(value: any): boolean`

Checks if the given value is a string.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a string; otherwise, `false`.

---

#### `Check.isString(value: any): boolean`

Checks if the given value is a string.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a string; otherwise, `false`.

---

#### `Check.isEmptyText(value: any): boolean`

Checks if the given string is empty or consists only of whitespace.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the string is empty or whitespace; otherwise, `false`.

---

#### `Check.isNonEmptyText(value: any): boolean`

Checks if the given string is not empty and contains non-whitespace characters.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the string is not empty and contains non-whitespace characters; otherwise, `false`.

---

#### `Check.isSymbol(value: any): boolean`

Checks if the given value is a symbol.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a symbol; otherwise, `false`.

---

#### `Check.isBoolean(value: any): boolean`

Checks if the given value is a boolean.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a boolean; otherwise, `false`.

---

#### `Check.isTruthy(value: any): boolean`

Checks if the given value is truthy.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is truthy; otherwise, `false`.

---

#### `Check.isFalsy(value: any): boolean`

Checks if the given value is falsy.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is falsy; otherwise, `false`.

---

#### `Check.isNull(value: any): boolean`

Checks if the given value is null.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is null; otherwise, `false`.

---

#### `Check.isUndefined(value: any): boolean`

Checks if the given value is undefined.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is undefined; otherwise, `false`.

---

#### `Check.isDefined(value: any): boolean`

Checks if the given value is defined (not undefined).

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is defined; otherwise, `false`.

---

#### `Check.isDefinedStrict(value: any): boolean`

Checks if the given value is defined and not null.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is defined and not null; otherwise, `false`.

---

#### `Check.isPromise(value: any): boolean`

Checks if the given value is a Promise.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a Promise; otherwise, `false`.

---

#### `Check.isPending(promise: Promise<any>): Promise<boolean>`

Checks if the given Promise is still pending.

- **Parameters:**

  - `promise` (Promise<any>): The Promise to check.

- **Returns:** `Promise<boolean>` - Returns a Promise that resolves to `true` if the Promise is pending; otherwise, `false`.

---

#### `Check.isDate(value: any): boolean`

Checks if the given value is a Date object.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a Date object; otherwise, `false`.

---

#### `Check.isMap(value: any): boolean`

Checks if the given value is a Map object.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a Map object; otherwise, `false`.

---

#### `Check.isRegExp(value: any): boolean`

Checks if the given value is a RegExp object.

- **Parameters:**

  - `value` (any): The value to check.

- **Returns:** `boolean` - Returns `true` if the value is a RegExp object; otherwise, `false`.

---

#### `Check.hasFlag(regex: RegExp, flag: string): boolean`

Checks if the given RegExp has the specified flag.

- **Parameters:**

  - `regex` (RegExp): The RegExp to check.
  - `flag` (string): The flag to check for.

- **Returns:** `boolean` - Returns `true` if the RegExp has the specified flag; otherwise, `false`.

---

#### `Check._isPropName(expression: string): boolean`

Checks if the given expression is a valid JavaScript property name.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid property name; otherwise, `false`.

---

#### `Check._isNumber(expression: string): boolean`

Checks if the given expression is a valid number.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid number; otherwise, `false`.

---

#### `Check._isInteger(expression: string): boolean`

Checks if the given expression is a valid integer.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid integer; otherwise, `false`.

---

#### `Check._isFloat(expression: string): boolean`

Checks if the given expression is a valid float.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid float; otherwise, `false`.

---

#### `Check._isText(expression: string): boolean`

Checks if the given expression is a valid text string (quoted).

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid text string; otherwise, `false`.

---

#### `Check._isDotNotation(expression: string): boolean`

Checks if the given expression is valid dot notation.

- **Parameters:**

- `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is valid dot notation; otherwise, `false`.

---

#### `Check._isBracketNotation(expression: string): boolean`

Checks if the given expression is valid bracket notation.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is valid bracket notation; otherwise, `false`.

---

#### `Check._isKey(expression: string): boolean`

Checks if the given expression is a valid key.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is a valid key; otherwise, `false`.

---

#### `Check._isArray(expression: string): boolean`

Checks if the given expression is a valid array notation.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is valid array notation; otherwise, `false`.

---

#### `Check._isObject(expression: string): boolean`

Checks if the given expression is a valid object notation.

- **Parameters:**

  - `expression` (string): The expression to check.

- **Returns:** `boolean` - Returns `true` if the expression is valid object notation; otherwise, `false`.

## Example Usage

```typescript
import Check from "@avocajs/check";

let value = [1, 2, 3];

if (Check.isArray(value)) {
  console.log("Value is an array.");
}

if (Check.isNonEmptyArray(value)) {
  console.log("Array is not empty.");
}
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
