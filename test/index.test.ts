import { Check } from "../src/index";

describe("Check Class", () => {
  describe("is", () => {
    test("is() should return true for valid type strings", () => {
      expect(Check.is("string", "string")).toBe(true);
      expect(Check.is(4, "number")).toBe(true);
      expect(Check.is([], "array")).toBe(true);
    });

    test("is() should return false for invalid type strings", () => {
      expect(Check.is(4, "string")).toBe(false);
    });
  });

  describe("type", () => {
    test("should return the correct type", () => {
      expect(Check.type("hello")).toBe("string");
      expect(Check.type(123)).toBe("number");
      expect(Check.type([])).toBe("array");
      expect(Check.type({})).toBe("object");
      expect(Check.type(null)).toBe("null");
    });
  });

  describe("isObject", () => {
    test("should return true for object literals", () => {
      expect(Check.isObject({})).toBe(true);
    });

    test("should return false for non-objects", () => {
      expect(Check.isObject([])).toBe(false);
      expect(Check.isObject(null)).toBe(false);
      expect(Check.isObject(123)).toBe(false);
      expect(Check.isObject("text")).toBe(false);
    });
  });

  describe("isObjectLike", () => {
    it("should return true for objects and arrays", () => {
      expect(Check.isObjectLike({})).toBe(true); // Plain object
      expect(Check.isObjectLike(new Object())).toBe(true); // Object instance
      expect(Check.isObjectLike(new Date())).toBe(true); // Date object
      expect(Check.isObjectLike(new Map())).toBe(true); // Map object
      expect(Check.isObjectLike(new Set())).toBe(true); // Set object
      expect(Check.isObjectLike([])).toBe(true); // Array
    });

    it("should return false for non-objects", () => {
      expect(Check.isObjectLike(() => {})).toBe(false); // Function
      expect(Check.isObjectLike("string")).toBe(false); // String
      expect(Check.isObjectLike(123)).toBe(false); // Number
      expect(Check.isObjectLike(Symbol("symbol"))).toBe(false); // Symbol
      expect(Check.isObjectLike(true)).toBe(false); // Boolean
      expect(Check.isObjectLike(undefined)).toBe(false); // Undefined
      expect(Check.isObjectLike(null)).toBe(false); // Null is not considered an object
    });
  });

  describe("isEmptyObject", () => {
    test("should return true for empty objects", () => {
      expect(Check.isEmptyObject({})).toBe(true);
    });

    test("should return false for non-empty objects", () => {
      expect(Check.isEmptyObject({ key: "value" })).toBe(false);
    });
  });

  describe("isNonEmptyObject", () => {
    it("should return true for non-empty objects", () => {
      expect(Check.isNonEmptyObject({ key: "value" })).toBe(true); // Non-empty object
    });

    it("should return false for empty objects and non-objects", () => {
      expect(Check.isNonEmptyObject({})).toBe(false); // Empty object
      expect(Check.isNonEmptyObject(null)).toBe(false); // Null
      expect(Check.isNonEmptyObject([])).toBe(false); // Array (not considered an object in this case)
      expect(Check.isNonEmptyObject("string")).toBe(false); // String
      expect(Check.isNonEmptyObject(123)).toBe(false); // Number
    });
  });

  describe("ownProp", () => {
    it("should return false if property is not a string", () => {
      expect(Check.ownProp({}, 123 as any)).toBe(false); // property is not a string
    });

    it("should return true if the object has the specified own property", () => {
      const obj = { key: "value" };
      expect(Check.ownProp(obj, "key")).toBe(true); // Property exists
    });

    it("should return false if the object does not have the specified own property", () => {
      const obj = { key: "value" };
      expect(Check.ownProp(obj, "missing")).toBe(false); // Property does not exist
      expect(Check.ownProp(null as any, "key")).toBe(false); // Null object
      expect(Check.ownProp({}, "")).toBe(false); // Empty string as property
    });

    it("should return false if the prop is inherited", () => {
      class Parent {
        public parentProp: any;
      }

      class Child extends Parent {
        public childProp: any;
      }

      expect(Check.ownProp(new Child(), "parentProp")).toBe(false);
    });
  });

  describe("ownProps", () => {
    it("should return true if all specified properties are present in the object", () => {
      const obj = { key1: "value1", key2: "value2" };
      expect(Check.ownProps(obj, ["key1", "key2"])).toBe(true); // All properties exist
    });

    it("should return false if any of the specified properties are missing", () => {
      const obj = { key1: "value1" };
      expect(Check.ownProps(obj, ["key1", "key2"])).toBe(false); // 'key2' is missing
      expect(Check.ownProps(null as any, ["key1"])).toBe(false); // Null object
      expect(Check.ownProps({}, [])).toBe(false); // Empty properties array
    });
  });

  describe("hasProp", () => {
    it("should return false if property is not a string", () => {
      expect(Check.hasProp({}, 123 as any)).toBe(false); // property is not a string
    });

    it("should return true if the object has the specified property", () => {
      const obj = { key: "value" };
      expect(Check.hasProp(obj, "key")).toBe(true); // Property exists
    });

    it("should return false if the object does not have the specified property", () => {
      const obj = { key: "value" };
      expect(Check.hasProp(obj, "missing")).toBe(false); // Property does not exist
      expect(Check.hasProp(null as any, "key")).toBe(false); // Null object
      expect(Check.hasProp({}, "")).toBe(false); // Empty string as property
    });

    it("should return true if the prop is inherited", () => {
      class Parent {
        public parentProp: any = undefined;
      }

      class Child extends Parent {
        public childProp: any = undefined;
      }

      expect(Check.hasProp(new Child(), "parentProp")).toBe(true);
    });
  });

  describe("hasProps", () => {
    it("should return true if all specified properties are present in the object", () => {
      const obj = { key1: "value1", key2: "value2" };
      expect(Check.hasProps(obj, ["key1", "key2"])).toBe(true); // All properties exist
    });

    it("should return false if any of the specified properties are missing", () => {
      const obj = { key1: "value1" };
      expect(Check.hasProps(obj, ["key1", "key2"])).toBe(false); // 'key2' is missing
      expect(Check.hasProps(null as any, ["key1"])).toBe(false); // Null object
      expect(Check.hasProps({}, [])).toBe(false); // Empty properties array
    });
  });

  describe("hasLength", () => {
    it("should return false if target is an object and length check fails", () => {
      expect(Check.hasLength({ key1: "value1", key2: "value2" }, 1)).toBe(
        false
      ); // object length check
    });

    it("should return false if length is not an integer", () => {
      expect(Check.hasLength("test", NaN)).toBe(false);
      expect(Check.hasLength([], 1.5)).toBe(false);
      expect(Check.hasLength({}, 2.5)).toBe(false);
    });

    test("should return true for objects, arrays, and strings with correct lengths", () => {
      expect(Check.hasLength([], 0)).toBe(true);
      expect(Check.hasLength([1, 2, 3], 3)).toBe(true);
      expect(Check.hasLength({ age: 24 }, 1)).toBe(true);
      expect(Check.hasLength("hello", 5)).toBe(true);
    });

    test("should return false for incorrect lengths", () => {
      expect(Check.hasLength([], 1)).toBe(false);
      expect(Check.hasLength("hello", 4)).toBe(false);
    });
  });

  describe("isArray", () => {
    test("isArray() should return true for arrays", () => {
      expect(Check.isArray([])).toBe(true);
    });

    test("isArray() should return false for non-arrays", () => {
      expect(Check.isArray({})).toBe(false);
      expect(Check.isArray("text")).toBe(false);
    });
  });

  describe("isEmptyArray", () => {
    it("should return true for an empty array", () => {
      expect(Check.isEmptyArray([])).toBe(true);
    });

    it("should return false for a non-empty array", () => {
      expect(Check.isEmptyArray([1])).toBe(false);
    });

    it("should return false for non-array values", () => {
      expect(Check.isEmptyArray("string")).toBe(false);
      expect(Check.isEmptyArray(123)).toBe(false);
      expect(Check.isEmptyArray({})).toBe(false);
    });
  });

  describe("isArrayOf", () => {
    it("should return false if the value is not an array", () => {
      expect(Check.isArrayOf("not an array" as any, "string")).toBe(false);
      expect(Check.isArrayOf(123 as any, "number")).toBe(false);
      expect(Check.isArrayOf({} as any, "object")).toBe(false);
    });

    it("should return false if the type is invalid", () => {
      expect(Check.isArrayOf([], "invalidType" as any)).toBe(false);
    });

    it("should return false for an empty array", () => {
      expect(Check.isArrayOf([], "string")).toBe(false);
    });

    it("should return false if any element does not match the type", () => {
      expect(Check.isArrayOf(["hello", 123], "string")).toBe(false);
      expect(Check.isArrayOf([1, "hello"], "number")).toBe(false);
    });

    it("should return true if all elements match the type", () => {
      expect(Check.isArrayOf(["hello", "world"], "string")).toBe(true);
      expect(Check.isArrayOf([1, 2, 3], "number")).toBe(true);
      expect(Check.isArrayOf([true, false], "boolean")).toBe(true);
    });
  });

  describe("isIterable", () => {
    it("should return true for iterable objects", () => {
      expect(Check.isIterable([])).toBe(true); // Arrays are iterable
      expect(Check.isIterable("string")).toBe(true); // Strings are iterable
      expect(Check.isIterable(new Set())).toBe(true); // Sets are iterable
      expect(Check.isIterable(new Map())).toBe(true); // Maps are iterable
    });

    it("should return false for non-iterable objects", () => {
      expect(Check.isIterable({})).toBe(false); // Plain objects are not iterable
      expect(Check.isIterable(123)).toBe(false); // Numbers are not iterable
      expect(Check.isIterable(null)).toBe(false); // Null is not iterable
      expect(Check.isIterable(undefined)).toBe(false); // Undefined is not iterable
    });
  });

  describe("hasIndex", () => {
    it("should return true if the index is within the valid range for an array or string", () => {
      expect(Check.hasIndex([1, 2, 3], 1)).toBe(true); // Valid index
      expect(Check.hasIndex("hello", 4)).toBe(true); // Valid index
    });

    it("should return false if the index is out of range for an array or string", () => {
      expect(Check.hasIndex([1, 2, 3], 3)).toBe(false); // Index out of range
      expect(Check.hasIndex("hello", 5)).toBe(false); // Index out of range
    });

    it("should return false if the target is not an array or string", () => {
      expect(Check.hasIndex({} as any, 0)).toBe(false);
      expect(Check.hasIndex(null as any, 0)).toBe(false);
      expect(Check.hasIndex(undefined as any, 0)).toBe(false);
      expect(Check.hasIndex(123 as any, 0)).toBe(false);
    });

    it("should return false if the index is not an integer", () => {
      expect(Check.hasIndex([1, 2, 3], "1" as any)).toBe(false);
      expect(Check.hasIndex("hello", 1.5)).toBe(false);
      expect(Check.hasIndex([1, 2, 3], null as any)).toBe(false);
      expect(Check.hasIndex("hello", undefined as any)).toBe(false);
    });
  });

  describe("isNumber", () => {
    test("should return true for numbers", () => {
      expect(Check.isNumber(123)).toBe(true);
    });

    test("should return false for non-numbers", () => {
      expect(Check.isNumber("text")).toBe(false);
      expect(Check.isNumber([])).toBe(false);
    });
  });

  describe("isInteger", () => {
    test("should return true for integers", () => {
      expect(Check.isInteger(123)).toBe(true);
      expect(Check.isInteger(-123)).toBe(true);
    });

    test("should return false for floats", () => {
      expect(Check.isInteger(123.45)).toBe(false);
    });
  });

  describe("isFloat", () => {
    test("should return true for floats", () => {
      expect(Check.isFloat(123.45)).toBe(true);
    });

    test("should return false for integers", () => {
      expect(Check.isFloat(123)).toBe(false);
      expect(Check.isFloat("hi")).toBe(false);
    });
  });

  describe("isEven", () => {
    it("should return true for even integers", () => {
      expect(Check.isEven(2)).toBe(true);
      expect(Check.isEven(-4)).toBe(true);
      expect(Check.isEven(0)).toBe(true);
    });

    it("should return false for odd integers", () => {
      expect(Check.isEven(1)).toBe(false);
      expect(Check.isEven(-3)).toBe(false);
    });

    it("should return false for non-integer numbers", () => {
      expect(Check.isEven(2.5)).toBe(false);
      expect(Check.isEven(-1.1)).toBe(false);
    });

    it("should return false for non-number values", () => {
      expect(Check.isEven("string" as any)).toBe(false);
      expect(Check.isEven(null as any)).toBe(false);
      expect(Check.isEven(undefined as any)).toBe(false);
    });
  });

  describe("isOdd", () => {
    it("should return true for odd integers", () => {
      expect(Check.isOdd(1)).toBe(true);
      expect(Check.isOdd(-3)).toBe(true);
    });

    it("should return false for even integers", () => {
      expect(Check.isOdd(2)).toBe(false);
      expect(Check.isOdd(-4)).toBe(false);
      expect(Check.isOdd(0)).toBe(false);
    });

    it("should return false for non-integer numbers", () => {
      expect(Check.isOdd(2.5)).toBe(false);
      expect(Check.isOdd(-1.1)).toBe(false);
    });

    it("should return false for non-number values", () => {
      expect(Check.isOdd("string" as any)).toBe(false);
      expect(Check.isOdd(null as any)).toBe(false);
      expect(Check.isOdd(undefined as any)).toBe(false);
    });
  });

  describe("isBetween", () => {
    it("should return true if number is strictly between min and max (exclusive)", () => {
      expect(Check.isBetween(5, 1, 10)).toBe(true);
      expect(Check.isBetween(2, 1, 10)).toBe(true);
      expect(Check.isBetween(9, 1, 10)).toBe(true);
    });

    it("should return false if number is not strictly between min and max", () => {
      expect(Check.isBetween(1, 1, 10)).toBe(false);
      expect(Check.isBetween(10, 1, 10)).toBe(false);
      expect(Check.isBetween(0, 1, 10)).toBe(false);
      expect(Check.isBetween(11, 1, 10)).toBe(false);
    });

    it("should return false if any value is not a number", () => {
      expect(Check.isBetween(5, "1" as any, 10)).toBe(false);
      expect(Check.isBetween(5, 1, "10" as any)).toBe(false);
      expect(Check.isBetween("5" as any, 1, 10)).toBe(false);
    });
  });

  describe("isLessThan", () => {
    it("should return true if compare is less than to", () => {
      expect(Check.isLessThan(5, 10)).toBe(true);
      expect(Check.isLessThan(-5, 0)).toBe(true);
    });

    it("should return false if compare is not less than to", () => {
      expect(Check.isLessThan(10, 5)).toBe(false);
      expect(Check.isLessThan(5, 5)).toBe(false);
    });

    it("should return false if any value is not a number", () => {
      expect(Check.isLessThan(5, "10" as any)).toBe(false);
      expect(Check.isLessThan("5" as any, 10)).toBe(false);
      expect(Check.isLessThan(null as any, 10)).toBe(false);
    });
  });

  describe("isLessThanOrEqual", () => {
    it("should return true if compare is less than or equal to to", () => {
      expect(Check.isLessThanOrEqual(5, 10)).toBe(true);
      expect(Check.isLessThanOrEqual(10, 10)).toBe(true);
      expect(Check.isLessThanOrEqual(-5, 0)).toBe(true);
    });

    it("should return false if compare is greater than to", () => {
      expect(Check.isLessThanOrEqual(15, 10)).toBe(false);
    });

    it("should return false if any value is not a number", () => {
      expect(Check.isLessThanOrEqual(5, "10" as any)).toBe(false);
      expect(Check.isLessThanOrEqual("5" as any, 10)).toBe(false);
      expect(Check.isLessThanOrEqual(null as any, 10)).toBe(false);
    });
  });

  describe("isGreaterThan", () => {
    it("should return true if compare is greater than to", () => {
      expect(Check.isGreaterThan(10, 5)).toBe(true);
      expect(Check.isGreaterThan(0, -5)).toBe(true);
    });

    it("should return false if compare is not greater than to", () => {
      expect(Check.isGreaterThan(5, 10)).toBe(false);
      expect(Check.isGreaterThan(5, 5)).toBe(false);
    });

    it("should return false if any value is not a number", () => {
      expect(Check.isGreaterThan(10, "5" as any)).toBe(false);
      expect(Check.isGreaterThan("10" as any, 5)).toBe(false);
      expect(Check.isGreaterThan(null as any, 5)).toBe(false);
    });
  });

  describe("isGreaterThanOrEqual", () => {
    it("should return true if compare is greater than or equal to to", () => {
      expect(Check.isGreaterThanOrEqual(10, 5)).toBe(true);
      expect(Check.isGreaterThanOrEqual(5, 5)).toBe(true);
      expect(Check.isGreaterThanOrEqual(0, -5)).toBe(true);
    });

    it("should return false if compare is less than to", () => {
      expect(Check.isGreaterThanOrEqual(5, 10)).toBe(false);
    });

    it("should return false if any value is not a number", () => {
      expect(Check.isGreaterThanOrEqual(10, "5" as any)).toBe(false);
      expect(Check.isGreaterThanOrEqual("10" as any, 5)).toBe(false);
      expect(Check.isGreaterThanOrEqual(null as any, 5)).toBe(false);
    });
  });

  describe("isNegativeInfinity", () => {
    it("should return true for negative infinity", () => {
      expect(Check.isNegativeInfinity(-Infinity)).toBe(true);
    });

    it("should return false for other values", () => {
      expect(Check.isNegativeInfinity(Infinity)).toBe(false);
      expect(Check.isNegativeInfinity(0)).toBe(false);
      expect(Check.isNegativeInfinity(-1)).toBe(false);
    });
  });

  describe("isInfinity", () => {
    it("should return true for positive infinity", () => {
      expect(Check.isInfinity(Infinity)).toBe(true);
    });

    it("should return false for negative infinity and other values", () => {
      expect(Check.isInfinity(-Infinity)).toBe(false);
      expect(Check.isInfinity(0)).toBe(false);
      expect(Check.isInfinity(-1)).toBe(false);
    });
  });

  describe("isFinite", () => {
    it("should return true for finite numbers", () => {
      expect(Check.isFinite(0)).toBe(true);
      expect(Check.isFinite(123)).toBe(true);
      expect(Check.isFinite(-123.45)).toBe(true);
    });

    it("should return false for infinite numbers and non-numbers", () => {
      expect(Check.isFinite(Infinity)).toBe(false);
      expect(Check.isFinite(-Infinity)).toBe(false);
      expect(Check.isFinite("string")).toBe(false);
      expect(Check.isFinite(null)).toBe(false);
    });
  });

  describe("isBoolean", () => {
    test("should return true for booleans", () => {
      expect(Check.isBoolean(true)).toBe(true);
      expect(Check.isBoolean(false)).toBe(true);
    });

    test("should return false for non-booleans", () => {
      expect(Check.isBoolean(123)).toBe(false);
      expect(Check.isBoolean("text")).toBe(false);
    });
  });

  describe("isNull", () => {
    test("should return true for null", () => {
      expect(Check.isNull(null)).toBe(true);
    });

    test("should return false for non-null values", () => {
      expect(Check.isNull(123)).toBe(false);
      expect(Check.isNull("text")).toBe(false);
    });
  });

  describe("isNaN", () => {
    test("should return true for NaN", () => {
      expect(Check.isNaN(NaN)).toBe(true);
    });

    test("should return false for non-NaN values", () => {
      expect(Check.isNaN(123)).toBe(false);
      expect(Check.isNaN("text")).toBe(false);
    });
  });

  describe("isUndefined", () => {
    test("should return true for undefined", () => {
      expect(Check.isUndefined(undefined)).toBe(true);
    });

    test("should return false for defined values", () => {
      expect(Check.isUndefined(123)).toBe(false);
      expect(Check.isUndefined("text")).toBe(false);
    });
  });

  describe("isPromise", () => {
    test("should return true for promises", () => {
      expect(Check.isPromise(Promise.resolve())).toBe(true);
    });

    test("should return false for non-promises", () => {
      expect(Check.isPromise(123)).toBe(false);
      expect(Check.isPromise("text")).toBe(false);
    });
  });

  describe("isDate", () => {
    test("should return true for dates", () => {
      expect(Check.isDate(new Date())).toBe(true);
    });

    test("should return false for non-dates", () => {
      expect(Check.isDate("2024-08-01")).toBe(false);
      expect(Check.isDate(123)).toBe(false);
    });
  });

  describe("isMap", () => {
    test("should return true for Maps", () => {
      expect(Check.isMap(new Map())).toBe(true);
    });

    test("should return false for non-Maps", () => {
      expect(Check.isMap({})).toBe(false);
      expect(Check.isMap("text")).toBe(false);
    });
  });

  describe("isRegExp", () => {
    test("should return true for regular expressions", () => {
      expect(Check.isRegExp(/abc/)).toBe(true);
    });

    test("should return false for non-regular expressions", () => {
      expect(Check.isRegExp("text")).toBe(false);
      expect(Check.isRegExp({})).toBe(false);
    });
  });

  describe("isFunction", () => {
    test("should return true for functions", () => {
      expect(Check.isFunction(() => {})).toBe(true);
    });

    test("should return false for non-functions", () => {
      expect(Check.isFunction(123)).toBe(false);
      expect(Check.isFunction("text")).toBe(false);
    });
  });

  describe("isAsyncFunction", () => {
    test("should return true for async functions", () => {
      expect(Check.isAsyncFunction(async () => {})).toBe(true);
    });

    test("should return false for non-async functions", () => {
      expect(Check.isAsyncFunction(() => {})).toBe(false);
    });
  });

  describe("isText and isString", () => {
    it("should return true for string values", () => {
      expect(Check.isText("Hello")).toBe(true);
      expect(Check.isString("Hello")).toBe(true);
    });

    it("should return false for non-string values", () => {
      expect(Check.isText(123)).toBe(false);
      expect(Check.isText({})).toBe(false);
      expect(Check.isString([])).toBe(false);
      expect(Check.isString(null)).toBe(false);
    });
  });

  describe("isEmptyText", () => {
    it("should return true for empty strings", () => {
      expect(Check.isEmptyText("")).toBe(true);
      expect(Check.isEmptyText("   ")).toBe(true);
    });

    it("should return false for non-empty strings", () => {
      expect(Check.isEmptyText("Hello")).toBe(false);
      expect(Check.isEmptyText(" Hello ")).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(Check.isEmptyText(123)).toBe(false);
      expect(Check.isEmptyText({})).toBe(false);
      expect(Check.isEmptyText([])).toBe(false);
      expect(Check.isEmptyText(null)).toBe(false);
    });
  });

  describe("isNonEmptyText", () => {
    it("should return true for non-empty strings", () => {
      expect(Check.isNonEmptyText("Hello")).toBe(true);
      expect(Check.isNonEmptyText(" Hello ")).toBe(true);
    });

    it("should return false for empty strings", () => {
      expect(Check.isNonEmptyText("")).toBe(false);
      expect(Check.isNonEmptyText("   ")).toBe(false);
    });

    it("should return false for non-string values", () => {
      expect(Check.isNonEmptyText(123)).toBe(false);
      expect(Check.isNonEmptyText({})).toBe(false);
      expect(Check.isNonEmptyText([])).toBe(false);
      expect(Check.isNonEmptyText(null)).toBe(false);
    });
  });

  describe("isSymbol", () => {
    it("should return true for symbols", () => {
      expect(Check.isSymbol(Symbol("sym"))).toBe(true);
    });

    it("should return false for non-symbol values", () => {
      expect(Check.isSymbol("Hello")).toBe(false);
      expect(Check.isSymbol(123)).toBe(false);
      expect(Check.isSymbol({})).toBe(false);
      expect(Check.isSymbol([])).toBe(false);
      expect(Check.isSymbol(null)).toBe(false);
    });
  });

  describe("isTruthy and isFalsy", () => {
    it("should return true for truthy values", () => {
      expect(Check.isTruthy("Hello")).toBe(true);
      expect(Check.isTruthy(123)).toBe(true);
      expect(Check.isTruthy({})).toBe(true);
      expect(Check.isTruthy([])).toBe(true);
    });

    it("should return false for falsy values", () => {
      expect(Check.isFalsy(false)).toBe(true);
      expect(Check.isFalsy(0)).toBe(true);
      expect(Check.isFalsy("")).toBe(true);
      expect(Check.isFalsy(null)).toBe(true);
      expect(Check.isFalsy(undefined)).toBe(true);
    });
  });

  describe("isNull", () => {
    it("should return true for null values", () => {
      expect(Check.isNull(null)).toBe(true);
    });

    it("should return false for non-null values", () => {
      expect(Check.isNull(undefined)).toBe(false);
      expect(Check.isNull("Hello")).toBe(false);
      expect(Check.isNull(123)).toBe(false);
    });
  });

  describe("isUndefined", () => {
    it("should return true for undefined values", () => {
      expect(Check.isUndefined(undefined)).toBe(true);
    });

    it("should return false for defined values", () => {
      expect(Check.isUndefined(null)).toBe(false);
      expect(Check.isUndefined("Hello")).toBe(false);
      expect(Check.isUndefined(123)).toBe(false);
    });
  });

  describe("isDefined", () => {
    it("should return true for defined values", () => {
      expect(Check.isDefined("Hello")).toBe(true);
      expect(Check.isDefined(123)).toBe(true);
      expect(Check.isDefined({})).toBe(true);
      expect(Check.isDefined([])).toBe(true);
    });

    it("should return false for undefined values", () => {
      expect(Check.isDefined(undefined)).toBe(false);
    });
  });

  describe("isDefinedStrict", () => {
    it("should return true for non-null and non-undefined values", () => {
      expect(Check.isDefinedStrict("Hello")).toBe(true);
      expect(Check.isDefinedStrict(123)).toBe(true);
      expect(Check.isDefinedStrict({})).toBe(true);
      expect(Check.isDefinedStrict([])).toBe(true);
    });

    it("should return false for null and undefined values", () => {
      expect(Check.isDefinedStrict(null)).toBe(false);
      expect(Check.isDefinedStrict(undefined)).toBe(false);
    });
  });

  describe("isPromise", () => {
    it("should return true for promises", () => {
      expect(Check.isPromise(Promise.resolve())).toBe(true);
    });

    it("should return false for non-promises", () => {
      expect(Check.isPromise("Hello")).toBe(false);
      expect(Check.isPromise(123)).toBe(false);
      expect(Check.isPromise({})).toBe(false);
      expect(Check.isPromise([])).toBe(false);
      expect(Check.isPromise(null)).toBe(false);
    });
  });

  describe("isPending", () => {
    it("should resolve to false if input is not a promise", async () => {
      const result1 = await Check.isPending("string" as any);
      expect(result1).toBe(false);

      const result2 = await Check.isPending(123 as any);
      expect(result2).toBe(false);

      const result3 = await Check.isPending({} as any);
      expect(result3).toBe(false);

      const result4 = await Check.isPending([] as any);
      expect(result4).toBe(false);
    });

    it("should return true if promise is pending", async () => {
      const pendingPromise = new Promise(() => {}); // A promise that never resolves
      expect(await Check.isPending(pendingPromise)).toBe(true);
    });

    it("should return false if promise is resolved", async () => {
      const resolvedPromise = Promise.resolve("done");
      expect(await Check.isPending(resolvedPromise)).toBe(false);
    });

    it("should return false if promise is rejected", async () => {
      const rejectedPromise = Promise.reject("error");
      expect(await Check.isPending(rejectedPromise)).toBe(false);
    });
  });

  describe("isDate", () => {
    it("should return true for Date objects", () => {
      expect(Check.isDate(new Date())).toBe(true);
    });

    it("should return false for non-Date values", () => {
      expect(Check.isDate("Hello")).toBe(false);
      expect(Check.isDate(123)).toBe(false);
      expect(Check.isDate({})).toBe(false);
      expect(Check.isDate([])).toBe(false);
      expect(Check.isDate(null)).toBe(false);
    });
  });

  describe("isMap", () => {
    it("should return true for Map objects", () => {
      expect(Check.isMap(new Map())).toBe(true);
    });

    it("should return false for non-Map values", () => {
      expect(Check.isMap("Hello")).toBe(false);
      expect(Check.isMap(123)).toBe(false);
      expect(Check.isMap({})).toBe(false);
      expect(Check.isMap([])).toBe(false);
      expect(Check.isMap(null)).toBe(false);
    });
  });

  describe("isRegExp", () => {
    it("should return true for RegExp objects", () => {
      expect(Check.isRegExp(/abc/)).toBe(true);
    });

    it("should return false for non-RegExp values", () => {
      expect(Check.isRegExp("Hello")).toBe(false);
      expect(Check.isRegExp(123)).toBe(false);
      expect(Check.isRegExp({})).toBe(false);
      expect(Check.isRegExp([])).toBe(false);
      expect(Check.isRegExp(null)).toBe(false);
    });
  });

  describe("hasFlag", () => {
    it("should return false if regex is not a RegExp", () => {
      expect(Check.hasFlag("invalid regex" as any, "i")).toBe(false); // regex is not a RegExp
    });

    it("should return false if flag is not text", () => {
      expect(Check.hasFlag(/test/, 123 as any)).toBe(false); // flag is not text
    });

    it("should return true if RegExp has a specific flag", () => {
      expect(Check.hasFlag(/abc/i, "i")).toBe(true);
    });

    it("should return false if RegExp does not have a specific flag", () => {
      expect(Check.hasFlag(/abc/, "i")).toBe(false);
    });
  });

  describe("_isPropName", () => {
    it("should return false if expression is not text", () => {
      expect(Check._isPropName(123 as any)).toBe(false); // expression is not text
    });

    it("should return true for valid property names", () => {
      expect(Check._isPropName("prop")).toBe(true);
      expect(Check._isPropName("$prop")).toBe(true);
      expect(Check._isPropName("prop_name")).toBe(true);
      expect(Check._isPropName("propName")).toBe(true);
    });

    it("should return false for invalid property names", () => {
      expect(Check._isPropName("1prop")).toBe(false);
      expect(Check._isPropName("prop-")).toBe(false);
      expect(Check._isPropName("prop name")).toBe(false);
      expect(Check._isPropName("")).toBe(false);
    });
  });

  describe("_isNumber", () => {
    it("should return false if expression is not text", () => {
      expect(Check._isNumber({} as any)).toBe(false); // expression is not text
    });

    it("should return true for valid numbers", () => {
      expect(Check._isNumber("123")).toBe(true);
      expect(Check._isNumber("123.45")).toBe(true);
    });

    it("should return false for invalid numbers", () => {
      expect(Check._isNumber("123.")).toBe(false);
      expect(Check._isNumber("abc")).toBe(false);
      expect(Check._isNumber("123a")).toBe(false);
      expect(Check._isNumber("")).toBe(false);
    });
  });

  describe("_isInteger", () => {
    it("should return false if expression is not text", () => {
      expect(Check._isInteger([] as any)).toBe(false); // expression is not text
    });

    it("should return true for valid integers", () => {
      expect(Check._isInteger("123")).toBe(true);
      expect(Check._isInteger("0")).toBe(true);
    });

    it("should return false for non-integers", () => {
      expect(Check._isInteger("123.45")).toBe(false);
      expect(Check._isInteger("abc")).toBe(false);
      expect(Check._isInteger("123a")).toBe(false);
      expect(Check._isInteger("")).toBe(false);
    });
  });

  describe("_isFloat", () => {
    it("should return false if expression is not text", () => {
      expect(Check._isFloat(null as any)).toBe(false); // expression is not text
    });

    it("should return true for valid floats", () => {
      expect(Check._isFloat("123.45")).toBe(true);
      expect(Check._isFloat("0.01")).toBe(true);
    });

    it("should return false for non-floats", () => {
      expect(Check._isFloat("123")).toBe(false);
      expect(Check._isFloat("123.")).toBe(false);
      expect(Check._isFloat("abc")).toBe(false);
      expect(Check._isFloat("")).toBe(false);
    });
  });

  describe("_isText", () => {
    it("should return true for valid text literals", () => {
      expect(Check._isText("'hello'")).toBe(true);
      expect(Check._isText('"hello"')).toBe(true);
    });

    it("should return false for non-text literals", () => {
      expect(Check._isText("hello")).toBe(false);
      expect(Check._isText(123 as any)).toBe(false);
      expect(Check._isText("")).toBe(false);
    });
  });

  describe("_isDotNotation", () => {
    it("should return false if expression is not a string for _isDotNotation", () => {
      expect(Check._isDotNotation(123 as any)).toBe(false); // expression is not a string
    });

    it("should return true for valid dot notation", () => {
      expect(Check._isDotNotation("prop.sub")).toBe(true);
      expect(Check._isDotNotation("prop.sub1.sub2")).toBe(true);
    });

    it("should return false for invalid dot notation", () => {
      expect(Check._isDotNotation("prop.")).toBe(false);
      expect(Check._isDotNotation("prop..sub")).toBe(false);
      expect(Check._isDotNotation("prop.sub.")).toBe(false);
      expect(Check._isDotNotation("")).toBe(false);
    });
  });

  describe("_isBracketNotation", () => {
    it("should return false if expression is not a string for _isBracketNotation", () => {
      expect(Check._isBracketNotation({} as any)).toBe(false); // expression is not a string
    });

    it("should return true for valid bracket notation", () => {
      expect(Check._isBracketNotation('prop["key"]')).toBe(true);
      expect(Check._isBracketNotation("prop[0]")).toBe(true);
      expect(Check._isBracketNotation('prop["key"][0]')).toBe(true);
    });

    it("should return false for invalid bracket notation", () => {
      expect(Check._isBracketNotation("prop[]")).toBe(false);
      expect(Check._isBracketNotation('prop["key"][0')).toBe(false);
      expect(Check._isBracketNotation("")).toBe(false);
    });
  });

  describe("_isNotation", () => {
    it("should return false if expression is not a string for _isNotation", () => {
      expect(Check._isNotation([] as any)).toBe(false); // expression is not a string
    });

    it("should return true for valid notation", () => {
      expect(Check._isNotation("prop[0].sub")).toBe(true);
      expect(Check._isNotation('prop["key"].sub[1]')).toBe(true);
      expect(Check._isNotation("prop.sub")).toBe(true);
    });

    it("should return false for invalid notation", () => {
      expect(Check._isNotation("prop[0]sub")).toBe(false);
      expect(Check._isNotation("prop..sub")).toBe(false);
      expect(Check._isNotation('prop["key"sub]')).toBe(false);
      expect(Check._isNotation("")).toBe(false);
    });
  });

  describe("isEncoding", () => {
    it("should return false if value is not a string for isEncoding", () => {
      expect(Check.isEncoding(123 as any)).toBe(false); // value is not a string
    });

    it("should return true for valid encodings", () => {
      expect(Check.isEncoding("ascii")).toBe(true);
      expect(Check.isEncoding("utf8")).toBe(true);
      expect(Check.isEncoding("base64")).toBe(true);
    });

    it("should return false for invalid encodings", () => {
      expect(Check.isEncoding("unknown")).toBe(false);
      expect(Check.isEncoding("utf")).toBe(false);
      expect(Check.isEncoding("")).toBe(false);
    });
  });

  describe("isClass", () => {
    it("should return true for classes", () => {
      class MyClass {}
      expect(Check.isClass(MyClass)).toBe(true);
    });

    it("should return false for non-classes", () => {
      function myFunction() {}
      expect(Check.isClass(myFunction)).toBe(false);
      expect(Check.isClass({})).toBe(false);
      expect(Check.isClass([])).toBe(false);
      expect(Check.isClass("string")).toBe(false);
    });
  });

  describe("isChildOf", () => {
    it("should return true if child is an instance of parent", () => {
      class Parent {}
      class Child extends Parent {}
      expect(Check.isChildOf(new Child(), Parent)).toBe(true);
    });

    it("should return false if child is not an instance of parent", () => {
      class Parent {}
      class Other {}
      expect(Check.isChildOf(new Other(), Parent)).toBe(false);
    });
  });

  describe("isError", () => {
    it("should return true for Error instances", () => {
      expect(Check.isError(new Error())).toBe(true);
    });

    it("should return true for specific Error types", () => {
      class CustomError extends Error {}
      expect(Check.isError(new CustomError(), CustomError)).toBe(true);
    });

    it("should return false for non-Error instances", () => {
      expect(Check.isError("string")).toBe(false);
      expect(Check.isError(123)).toBe(false);
      expect(Check.isError({})).toBe(false);
      expect(Check.isError(new Date())).toBe(false);
    });
  });

  describe("hasMessage", () => {
    it("should return true if Error has a non-empty message", () => {
      expect(Check.hasMessage(new Error("message"))).toBe(true);
    });

    it("should return false if Error has an empty message", () => {
      expect(Check.hasMessage(new Error(""))).toBe(false);
    });

    it("should return false for non-Error values", () => {
      expect(Check.hasMessage("string" as any)).toBe(false);
      expect(Check.hasMessage(123 as any)).toBe(false);
      expect(Check.hasMessage({} as any)).toBe(false);
    });
  });

  describe("hasName", () => {
    it("should return true if Error has a non-empty name", () => {
      expect(Check.hasName(new Error("message"))).toBe(true);
    });

    it("should return false if Error has an empty name", () => {
      const customError = new Error("message");
      customError.name = "";
      expect(Check.hasName(customError)).toBe(false);
    });

    it("should return false for non-Error values", () => {
      expect(Check.hasName("string" as any)).toBe(false);
      expect(Check.hasName(123 as any)).toBe(false);
      expect(Check.hasName({} as any)).toBe(false);
    });
  });

  describe("areFunctions", () => {
    it("should return true if all values are functions", () => {
      expect(
        Check.areFunctions(
          () => {},
          function () {},
          class {}
        )
      ).toBe(true);
    });

    it("should return false if any value is not a function", () => {
      expect(Check.areFunctions(() => {}, "string")).toBe(false);
      expect(Check.areFunctions(() => {}, 123)).toBe(false);
      expect(Check.areFunctions(() => {}, {})).toBe(false);
      expect(Check.areFunctions()).toBe(false);
    });
  });

  describe("areDefined", () => {
    it("should return true if all values are defined", () => {
      expect(Check.areDefined("value", 123, {})).toBe(true);
    });

    it("should return false if any value is undefined", () => {
      expect(Check.areDefined("value", 123, undefined)).toBe(false);
      expect(Check.areDefined(undefined)).toBe(false);
      expect(Check.areDefined()).toBe(false);
    });
  });
});
