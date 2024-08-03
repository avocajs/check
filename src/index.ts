type _Type =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function"
  | "null"
  | "array";

export class Check {
  /**
   * Checks if the given value is of the given type.
   * @param value - The value to check.
   * @param type - The value type.
   * @returns `true` if the type is correct; otherwise, `false`.
   * @example
   * Check.is(null, 'null') // true
   * Check.is([1,2,3], 'array') // true
   * Check.is({age: 24}, 'object') // true
   */
  public static is(value: any, type: _Type): boolean {
    return Check.type(value) === type;
  }

  /**
   * Determines the type of the given value.
   * @param value - The value whose type is to be determined.
   * @returns A string representing the type of the value.
   * @example
   * Check.type(null); // 'null'
   * Check.type([1,2,3]); // 'array'
   * Check.type({age: 24}); // 'object'
   */
  public static type(value: any): _Type {
    if (value === null) return "null";
    if (Check.isArray(value)) return "array";
    if (Check.isObject(value)) return "object";
    return typeof value;
  }

  /**
   * Checks if the given value is an object but not null or an array.
   * @param value - The value to check.
   * @returns `true` if the value is an object; otherwise, `false`.
   * @example
   * Check.isObject(null); // false
   * Check.isObject([1,2,3]); // false
   * Check.isObject({age: 24}); // true
   */
  public static isObject(value: any): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  /**
   * Checks if the given value is either an object or an array.
   * @param value - The value to check.
   * @returns `true` if the value is an object or array; otherwise, `false`.
   * @example
   * Check.isObjectLike(null); // false
   * Check.isObjectLike([1,2,3]); // true
   * Check.isObjectLike({age: 24}); // true
   */
  public static isObjectLike(value: any): boolean {
    return ["object", "array"].includes(Check.type(value));
  }

  /**
   * Checks if the given object is empty (i.e., has no own properties).
   * @param value - The object to check.
   * @returns `true` if the object is empty; otherwise, `false`.
   * @example
   * Check.isEmptyObject({}); // true
   * Check.isEmptyObject({age: 24}); // false
   */
  public static isEmptyObject(value: any): boolean {
    return Check.isObject(value) && Object.keys(value).length === 0;
  }

  /**
   * Checks if the given object is non-empty (i.e., has at least one own property).
   * @param value - The object to check.
   * @returns `true` if the object is non-empty; otherwise, `false`.
   * @example
   * Check.isNonEmptyObject({}); // false
   * Check.isNonEmptyObject({age: 24}); // true
   */
  public static isNonEmptyObject(value: any): boolean {
    return Check.isObject(value) && Object.keys(value).length > 0;
  }

  /**
   * Checks if the given object has a specific own property.
   * @param object - The object to check.
   * @param property - The property name to check.
   * @returns `true` if the object has the specified property; otherwise, `false`.
   * @example
   *   class Parent {
   *     parentProp = undefined;
   *   }
   *
   *   class Child extends Parent {
   *     childProp = undefined;
   *   }
   *
   *  Check.ownProp(new Child(), "parentProp") // false
   *  Check.ownProp(new Child(), "childProp") // true
   */
  public static ownProp(object: object, property: string): boolean {
    if (!Check.isObject(object)) return false;
    if (!Check.isText(property)) return false;

    return object.hasOwnProperty(property);
  }

  /**
   * Checks if the given object has all of the specified own properties.
   * @param object - The object to check.
   * @param properties - An array of property names to check.
   * @returns `true` if the object has all specified properties; otherwise, `false`.
   * @example
   * Check.ownProp({age: 24, name: 'avocajs'}, ['name', 'gender']); // false
   * Check.ownProp({age: 24, name: 'avocajs'}, ['name', 'age']); // true
   */
  public static ownProps(object: object, properties: string[]): boolean {
    if (!Check.isObject(object)) return false;
    if (!Check.isNonEmptyArray(properties)) return false;

    return properties.every((propert) => object.hasOwnProperty(propert));
  }

  /**
   * Checks if the given object has a specific property (including inherited properties).
   * @param object - The object to check.
   * @param property - The property name to check.
   * @returns `true` if the object has the specified property; otherwise, `false`.
   * @example
   * @example
   *   class Parent {
   *     parentProp = undefined;
   *   }
   *
   *   class Child extends Parent {
   *     childProp = undefined;
   *   }
   *
   *  Check.hasProp(new Child(), "parentProp") // true
   *  Check.hasProp(new Child(), "childProp") // true
   */
  public static hasProp(object: object, property: string): boolean {
    if (!Check.isObject(object)) return false;
    if (!Check.isText(property)) return false;

    return Object.keys(object).includes(property);
  }

  /**
   * Checks if the given object has all of the specified properties (including inherited properties).
   * @param object - The object to check.
   * @param properties - An array of property names to check.
   * @returns `true` if the object has all specified properties; otherwise, `false`.
   * @example
   * Check.hasProps({age: 24, name: 'avocajs'}, ['name', 'gender']); // false
   * Check.hasProps({age: 24, name: 'avocajs'}, ['name', 'age']); // true
   */
  public static hasProps(object: object, properties: string[]): boolean {
    if (!Check.isObject(object)) return false;
    if (!Check.isNonEmptyArray(properties)) return false;

    return properties.every((property) =>
      Object.keys(object).includes(property)
    );
  }

  /**
   * Checks if the target object, array, or string has the specified length.
   * @param target - The object, array, or string to check.
   * @param length - The length to check against.
   * @returns `true` if the target has the specified length; otherwise, `false`.
   * @example
   * Check.hasLength({age: 24, name: 'avocajs'}, 2); // true
   * Check.hasLength(['name', 'age'], 2); // true
   * Check.hasLength('avocajs', 7); // true
   */
  public static hasLength(
    target: Object | Array<any> | string,
    length: number
  ): boolean {
    if (
      Check.isInteger(length) &&
      (Check.isText(target) || Check.isArray(target) || Check.isObject(target))
    ) {
      if (Check.isObject(target)) return Object.keys(target).length === length;
      if (Check.isText(target)) return (target as string).length === length;
      if (Check.isArray(target))
        return (target as Array<any>).length === length;
    }

    return false;
  }

  /**
   * Checks if the given value is an array.
   * @param value - The value to check.
   * @returns `true` if the value is an array; otherwise, `false`.
   */
  public static isArray(value: any): boolean {
    return Array.isArray(value);
  }

  /**
   * Checks if the given array is empty.
   * @param value - The array to check.
   * @returns `true` if the array is empty; otherwise, `false`.
   */
  public static isEmptyArray(value: any): boolean {
    return Array.isArray(value) && value.length === 0;
  }

  /**
   * Checks if the given array is non-empty.
   * @param value - The array to check.
   * @returns `true` if the array is non-empty; otherwise, `false`.
   */
  public static isNonEmptyArray(value: any): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  /**
   * Checks if the given array is an array of a specific type.
   * @param array - The array to check.
   * @param type - The type to check against.
   * @returns `true` if the array contains elements of the specified type; otherwise, `false`.
   * @example
   * Check.isArrayOf([1,2,3], 'number'); // true
   * Check.isArrayOf([1,2,'string'], 'number'); // false
   * Check.isArrayOf([[],[]], 'array'); // true
   */
  public static isArrayOf(array: Array<any>, type: _Type): boolean {
    if (!Check.isArray(array)) return false;
    if (array.length === 0) return false;

    for (const value of array) {
      if (Check.type(value) !== type) return false;
    }

    return true;
  }

  /**
   * Checks if the given value is iterable.
   * @param value - The value to check.
   * @returns `true` if the value is iterable; otherwise, `false`.
   */
  public static isIterable(value: any): boolean {
    return Symbol.iterator in Object(value);
  }

  /**
   * Checks if the given array or string contains an element at the specified index.
   * @param target - The array or string to check.
   * @param index - The index to check.
   * @returns `true` if the index is within bounds; otherwise, `false`.
   */
  public static hasIndex(target: Array<any> | string, index: number) {
    if (
      Check.isInteger(index) &&
      (Check.isArray(target) || Check.isText(target))
    ) {
      return index >= 0 && index < target.length;
    }

    return false;
  }

  /**
   * Checks if the given value is a number.
   * @param value - The value to check.
   * @returns `true` if the value is a number; otherwise, `false`.
   */
  public static isNumber(value: any): boolean {
    return typeof value === "number";
  }

  /**
   * Checks if the given value is an integer.
   * @param value - The value to check.
   * @returns `true` if the value is an integer; otherwise, `false`.
   */
  public static isInteger(value: any) {
    return Number.isFinite(value) && Number.isInteger(value);
  }

  /**
   * Checks if the given value is a float (not an integer).
   * @param value - The value to check.
   * @returns `true` if the value is a float; otherwise, `false`.
   */
  public static isFloat(value: any) {
    return Number.isFinite(value) && !Number.isInteger(value);
  }

  /**
   * Checks if the given number is even.
   * @param value - The number to check.
   * @returns `true` if the number is even; otherwise, `false`.
   */
  public static isEven(value: number): boolean {
    if (!Check.isInteger(value)) return false;

    return value % 2 === 0;
  }

  /**
   * Checks if the given number is odd.
   * @param value - The number to check.
   * @returns `true` if the number is odd; otherwise, `false`.
   */
  public static isOdd(value: number): boolean {
    if (!Check.isInteger(value)) return false;

    return value % 2 !== 0;
  }

  /**
   * Checks if the given number is between the specified range (exclusive).
   * @param number - The number to check.
   * @param min - The minimum value of the range.
   * @param max - The maximum value of the range.
   * @returns `true` if the number is within the range; otherwise, `false`.
   *  @example
   * Check.isBetween(2,0,3); // true
   * Check.isBetween(2,0,2); // false
   * Check.isBetween(2,0,1); // false
   */
  public static isBetween(number: number, min: number, max: number): boolean {
    if (!Check.isNumber(number) || !Check.isNumber(min) || !Check.isNumber(max))
      return false;

    return number < max && number > min;
  }

  /**
   * Checks if the given number is less than the specified value.
   * @param compare - The number to compare.
   * @param to - The value to compare against.
   * @returns `true` if the number is less than the value; otherwise, `false`.
   */
  public static isLessThan(compare: number, to: number): boolean {
    if (!Check.isNumber(compare) || !Check.isNumber(to)) return false;

    return compare < to;
  }

  /**
   * Checks if the given number is less than or equal to the specified value.
   * @param compare - The number to compare.
   * @param to - The value to compare against.
   * @returns `true` if the number is less than or equal to the value; otherwise, `false`.
   */
  public static isLessThanOrEqual(compare: number, to: number): boolean {
    if (!Check.isNumber(compare) || !Check.isNumber(to)) return false;

    return compare <= to;
  }

  /**
   * Checks if the given number is greater than the specified value.
   * @param compare - The number to compare.
   * @param to - The value to compare against.
   * @returns `true` if the number is greater than the value; otherwise, `false`.
   */
  public static isGreaterThan(compare: number, to: number): boolean {
    if (!Check.isNumber(compare) || !Check.isNumber(to)) return false;

    return compare > to;
  }

  /**
   * Checks if the given number is greater than or equal to the specified value.
   * @param compare - The number to compare.
   * @param to - The value to compare against.
   * @returns `true` if the number is greater than or equal to the value; otherwise, `false`.
   */
  public static isGreaterThanOrEqual(compare: number, to: number): boolean {
    if (!Check.isNumber(compare) || !Check.isNumber(to)) return false;

    return compare >= to;
  }

  /**
   * Checks if the given value is negative infinity.
   * @param value - The value to check.
   * @returns `true` if the value is negative infinity; otherwise, `false`.
   */
  public static isNegativeInfinity(value: any): boolean {
    return value === -Infinity;
  }

  /**
   * Checks if the given value is positive infinity.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is positive infinity, otherwise false.
   */
  public static isInfinity(value: any): boolean {
    return value === Infinity;
  }

  /**
   * Checks if the given value is a finite number.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is finite, otherwise false.
   * @example
   * Check.isFinite(123); // true
   * Check.isFinite(Infinity); // false
   */
  public static isFinite(value: any): boolean {
    return Number.isFinite(value);
  }

  /**
   * Checks if the given value is a function.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a function, otherwise false.
   * @example
   * Check.isFunction(function() {}); // true
   * Check.isFunction(123); // false
   */
  public static isFunction(value: any): boolean {
    return typeof value === "function";
  }

  /**
   * Checks if the given value is an async function.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is an async function, otherwise false.
   * @example
   * Check.isAsyncFunction(async function() {}); // true
   * Check.isAsyncFunction(function() {}); // false
   * @note This method may not work properly in ES6 and older versions
   * @note This method does not execute the given async function
   * @note This method simply uses constructor.name to check if the function is async
   */
  public static isAsyncFunction(value: any): boolean {
    return (
      Check.isFunction(value) && value.constructor.name === "AsyncFunction"
    );
  }

  /**
   * Checks if the given value is a string.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a string, otherwise false.
   * @example
   * Check.isText("hello"); // true
   * Check.isText(123); // false
   */
  public static isText(value: any): boolean {
    return typeof value === "string";
  }

  /**
   * Checks if the given value is a string.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a string, otherwise false.
   * @example
   * Check.isString("hello"); // true
   * Check.isString(123); // false
   */
  public static isString(value: any): boolean {
    return typeof value === "string";
  }

  /**
   * Checks if the given value is a string and is empty (i.e., has no non-whitespace characters).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a string and is empty, otherwise false.
   * @example
   * Check.isEmptyText(""); // true
   * Check.isEmptyText("   "); // true
   * Check.isEmptyText("hello"); // false
   */
  public static isEmptyText(value: any): boolean {
    return Check.isText(value) && value.trim().length === 0;
  }

  /**
   * Checks if the given value is a string and is not empty (i.e., has at least one non-whitespace character).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a string and is not empty, otherwise false.
   * @example
   * Check.isNonEmptyText("hello"); // true
   * Check.isNonEmptyText(""); // false
   * Check.isNonEmptyText("   "); // false
   */
  public static isNonEmptyText(value: any): boolean {
    return Check.isText(value) && value.trim().length > 0;
  }

  /**
   * Checks if the given value is a symbol.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a symbol, otherwise false.
   * @example
   * Check.isSymbol(Symbol("foo")); // true
   * Check.isSymbol("foo"); // false
   */
  public static isSymbol(value: any) {
    return typeof value === "symbol";
  }

  /**
   * Checks if the given value is a boolean.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a boolean, otherwise false.
   * @example
   * Check.isBoolean(true); // true
   * Check.isBoolean("true"); // false
   */
  public static isBoolean(value: any): boolean {
    return typeof value === "boolean";
  }

  /**
   * Checks if the given value is truthy (i.e., not falsy).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is truthy, otherwise false.
   * @example
   * Check.isTruthy(1); // true
   * Check.isTruthy(0); // false
   */
  public static isTruthy(value: any): boolean {
    return !!value;
  }

  /**
   * Checks if the given value is falsy (i.e., evaluates to false).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is falsy, otherwise false.
   * @example
   * Check.isFalsy(0); // true
   * Check.isFalsy(1); // false
   */
  public static isFalsy(value: any): boolean {
    return !value;
  }

  /**
   * Checks if the given value is null.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is null, otherwise false.
   * @example
   * Check.isNull(null); // true
   * Check.isNull(undefined); // false
   */
  public static isNull(value: any): boolean {
    return value === null;
  }

  /**
   * Checks if the given value is NaN (Not-a-Number).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is NaN, otherwise false.
   * @example
   * Check.isNaN(NaN); // true
   * Check.isNaN(123); // false
   */
  public static isNaN(value: any): boolean {
    return Number.isNaN(value);
  }

  /**
   * Checks if the given value is undefined.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is undefined, otherwise false.
   * @example
   * Check.isUndefined(undefined); // true
   * Check.isUndefined(null); // false
   */
  public static isUndefined(value: any): boolean {
    return value === undefined;
  }

  /**
   * Checks if the given value is defined (i.e., not undefined).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is defined, otherwise false.
   * @example
   * Check.isDefined(123); // true
   * Check.isDefined(undefined); // false
   */
  public static isDefined(value: any): boolean {
    return value !== undefined;
  }

  /**
   * Checks if the given value is strictly defined (i.e., not undefined and not null).
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is defined and not null, otherwise false.
   * @example
   * Check.isDefinedStrict(123); // true
   * Check.isDefinedStrict(null); // false
   * Check.isDefinedStrict(undefined); // false
   */
  public static isDefinedStrict(value: any): boolean {
    return value !== undefined && value !== null;
  }

  /**
   * Checks if the given value is a Promise.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a Promise, otherwise false.
   * @example
   * Check.isPromise(Promise.resolve()); // true
   * Check.isPromise(123); // false
   */
  public static isPromise(value: any): boolean {
    return value instanceof Promise;
  }

  /**
   * Checks if the given promise is pending.
   *
   * @param {Promise<any>} promise - The promise to check.
   * @returns {Promise<boolean>} - Returns a promise that resolves to true if the given promise is pending, otherwise false.
   * @example
   * const pendingPromise = new Promise(() => {}); // A pending promise
   * Check.isPending(pendingPromise).then(result => console.log(result)); // true
   */
  public static isPending(promise: Promise<any>): Promise<boolean> {
    if (!Check.isPromise(promise)) return Promise.resolve(false);

    return Promise.race([promise, "pending"]).then(
      (v) => (v === "pending" ? true : false),
      (r) => false
    );
  }

  /**
   * Checks if the given value is a Date object.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a Date object, otherwise false.
   * @example
   * Check.isDate(new Date()); // true
   * Check.isDate("2024-08-03"); // false
   */
  public static isDate(value: any): boolean {
    return value instanceof Date;
  }

  /**
   * Checks if the given value is a Map object.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a Map object, otherwise false.
   * @example
   * Check.isMap(new Map()); // true
   * Check.isMap([]); // false
   */
  public static isMap(value: any): boolean {
    return value instanceof Map;
  }

  /**
   * Checks if the given value is a RegExp object.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a RegExp object, otherwise false.
   * @example
   * Check.isRegExp(/abc/); // true
   * Check.isRegExp("abc"); // false
   */
  public static isRegExp(value: any): boolean {
    return value instanceof RegExp;
  }

  /**
   * Checks if the given regular expression has a specific flag.
   *
   * @param {RegExp} regex - The regular expression to check.
   * @param {string} flag - The flag to check for.
   * @returns {boolean} - Returns true if the regular expression has the specified flag, otherwise false.
   * @example
   * Check.hasFlag(/abc/i, "i"); // true
   * Check.hasFlag(/abc/, "i"); // false
   */
  public static hasFlag(regex: RegExp, flag: string): boolean {
    if (!Check.isText(flag)) return false;
    if (!Check.isRegExp(regex)) return false;
    return regex.flags.includes(flag);
  }

  /**
   * Checks if the given expression is a valid property name.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid property name, otherwise false.
   * @example
   * Check._isPropName("property"); // true
   * Check._isPropName("property1"); // true
   * Check._isPropName("1property"); // false
   */
  public static _isPropName(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^(?:[a-z_$][a-z0-9_$]*)$/i.test(expression);
  }

  /**
   * Checks if the given expression is a valid number.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid number, otherwise false.
   * @example
   * Check._isNumber("123"); // true
   * Check._isNumber("123.45"); // true
   * Check._isNumber("abc"); // false
   */
  public static _isNumber(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^(?:[0-9]+(?:\.[0-9]+)?)$/.test(expression);
  }

  /**
   * Checks if the given expression is a valid integer.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid integer, otherwise false.
   * @example
   * Check._isInteger("123"); // true
   * Check._isInteger("123.45"); // false
   */
  public static _isInteger(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^(?:[0-9]+)$/.test(expression);
  }

  /**
   * Checks if the given expression is a valid float.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid float, otherwise false.
   * @example
   * Check._isFloat("123.45"); // true
   * Check._isFloat("123"); // false
   */
  public static _isFloat(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^(?:[0-9]+\.[0-9]+)$/.test(expression);
  }

  /**
   * Checks if the given expression is a valid quoted string.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid quoted string, otherwise false.
   * @example
   * Check._isText("'hello'"); // true
   * Check._isText("hello"); // false
   */
  public static _isText(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^(?:'[^']*'|"[^"]*")$/.test(expression);
  }

  /**
   * Checks if the given expression is in dot notation.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is in dot notation, otherwise false.
   * @example
   * Check._isDotNotation("obj.prop"); // true
   * Check._isDotNotation("obj[prop]"); // false
   */
  public static _isDotNotation(expression: string): boolean {
    if (!Check.isText(expression)) return false;
    return /^([a-z_$][a-z0-9_$]*(?:\.[a-z_$][a-z0-9_$]*)+)$/.test(expression);
  }

  /**
   * Checks if the given expression is in bracket notation.
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is in bracket notation, otherwise false.
   * @example
   * Check._isBracketNotation("obj['prop']"); // true
   * Check._isBracketNotation("obj.prop"); // false
   */
  public static _isBracketNotation(expression: string): boolean {
    if (!Check.isText(expression)) return false;

    return /^([a-zA-Z_\$][a-zAZ0-9_\$]*(?:\[['"].*['"]\]|\[[0-9]+\])+)$/.test(
      expression
    );
  }

  /**
   * Checks if the given expression is a valid notation (dot or bracket).
   *
   * @param {string} expression - The expression to check.
   * @returns {boolean} - Returns true if the expression is a valid notation, otherwise false.
   * @example
   * Check._isNotation("obj.prop['subProp']"); // true
   * Check._isNotation("obj prop"); // false
   */
  public static _isNotation(expression: string): boolean {
    if (!Check.isText(expression)) return false;
    return /^(?:[a-z_$][a-z0-9_$]*(?:\[(?:\d+|["'][^"']*["'])\]|\.[a-z_$][a-z0-9_$]*)+)$/i.test(
      expression
    );
  }

  /**
   * Checks if the given value is a valid encoding type.
   *
   * @param {string} value - The value to check.
   * @returns {boolean} - Returns true if the value is a valid encoding type, otherwise false.
   * @example
   * Check.isEncoding("utf-8"); // true
   * Check.isEncoding("unknown"); // false
   */
  public static isEncoding(value: string): boolean {
    if (!Check.isText(value)) return false;

    return [
      "ascii",
      "utf8",
      "utf-8",
      "utf16le",
      "ucs2",
      "ucs-2",
      "base64",
      "base64url",
      "latin1",
      "binary",
      "hex",
    ].includes(value);
  }

  /**
   * Checks if the given value is a class.
   *
   * @param {any} value - The value to check.
   * @returns {boolean} - Returns true if the value is a class, otherwise false.
   * @example
   * Check.isClass(class MyClass {}); // true
   * Check.isClass(() => {}); // false
   */
  public static isClass(value: any): boolean {
    return typeof value === "function" && value.toString().startsWith("class ");
  }

  /**
   * Checks if the given child is an instance of the specified parent class.
   *
   * @param {any} child - The child to check.
   * @param {any} parent - The parent class.
   * @returns {boolean} - Returns true if the child is an instance of the parent class, otherwise false.
   * @example
   * class Parent {}
   * class Child extends Parent {}
   * Check.isChildOf(new Child(), Parent); // true
   * Check.isChildOf({}, Parent); // false
   */
  public static isChildOf(child: any, parent: any): boolean {
    return child instanceof parent;
  }

  /**
   * Checks if the given value is an error.
   *
   * @param {any} value - The value to check.
   * @param {any} [type] - The specific error type to check.
   * @returns {boolean} - Returns true if the value is an error of the specified type, otherwise false.
   * @example
   * Check.isError(new Error()); // true
   * Check.isError({}, Error); // false
   */
  public static isError(value: any, type?: any): boolean {
    if (Check.isDefined(type)) {
      return value instanceof type;
    }

    return value instanceof Error;
  }

  /**
   * Checks if the given error has a message.
   *
   * @param {Error} error - The error to check.
   * @returns {boolean} - Returns true if the error has a message, otherwise false.
   * @example
   * Check.hasMessage(new Error("oops")); // true
   * Check.hasMessage(new Error("")); // false
   */
  public static hasMessage(error: Error) {
    return (
      Check.isError(error) &&
      Check.isText(error.message) &&
      error.message.length > 0
    );
  }

  /**
   * Checks if the given error has a name.
   *
   * @param {Error} error - The error to check.
   * @returns {boolean} - Returns true if the error has a name, otherwise false.
   * @example
   * Check.hasName(new Error()); // true
   * Check.hasName({}); // false
   */
  public static hasName(error: Error) {
    return (
      Check.isError(error) && Check.isText(error.name) && error.name.length > 0
    );
  }

  /**
   * Checks if all given values are functions.
   *
   * @param {...any} values - The values to check.
   * @returns {boolean} - Returns true if all values are functions, otherwise false.
   * @example
   * Check.areFunctions(() => {}, function() {}); // true
   * Check.areFunctions(() => {}, 123); // false
   */
  public static areFunctions(...values: Array<any>): boolean {
    if (!Check.isNonEmptyArray(values)) return false;

    for (let $index = 0; $index < values.length; $index++) {
      const value = values[$index];
      if (!Check.isFunction(value)) return false;
    }

    return true;
  }

  /**
   * Checks if all given values are defined.
   *
   * @param {...any} values - The values to check.
   * @returns {boolean} - Returns true if all values are defined, otherwise false.
   * @example
   * Check.areDefined(1, "a", true); // true
   * Check.areDefined(1, undefined, true); // false
   */
  public static areDefined(...values: Array<any>): boolean {
    if (!Check.isNonEmptyArray(values)) return false;

    for (let $index = 0; $index < values.length; $index++) {
      const value = values[$index];
      if (value === undefined) return false;
    }

    return true;
  }
}
