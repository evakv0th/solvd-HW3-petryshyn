/// 1.1
function calculateDiscountedPrice(products, discount) {
  if (
    Array.isArray(products) &&
    products.every(
      (product) =>
        typeof product.price === "number" &&
        typeof product.name === "string" &&
        !isNaN(product.price)
    ) &&
    typeof discount === "number" &&
    discount > 0 &&
    discount < 100
  ) {
    const useDiscount = (e) => e.price - (e.price * discount) / 100;
    const resultArray = products.map(useDiscount);
    return resultArray;
  } else {
    throw new Error(
      "products should be an non-empty array which contains object with properties name(str) and price(num) and discount should be a number from 0 to 100"
    );
  }
}

console.log(
  calculateDiscountedPrice(
    [
      { name: "potato", price: 100 },
      { name: "tomato", price: 80 },
    ],
    50
  )
);

/// 1.2

function calculateTotalPrice(products) {
  if (
    Array.isArray(products) &&
    products.length > 0 &&
    products.every(
      (product) =>
        typeof product.name === "string" &&
        typeof product.price === "number" &&
        !isNaN(product.price)
    )
  ) {
    let sum = 0;
    const add = (e) => (sum += e.price);
    products.map(add);
    return sum;
  } else {
    throw new Error(
      "products should be an non-empty array which contains object with properties name(str) and price(num)"
    );
  }
}

console.log(
  calculateTotalPrice([
    { name: "potato", price: 100 },
    { name: "tomato", price: 80 },
  ])
);

/// 2.1

function getFullName({ firstName, lastName }) {
  if (
    !firstName ||
    !lastName ||
    typeof firstName !== "string" ||
    typeof lastName !== "string"
  ) {
    throw new Error("first name or last name are not string or are undefined");
  }
  return `${firstName} ${lastName}`;
}

console.log(getFullName({ firstName: "jhon", lastName: "Sandler" }));
/// 2.2

function filterUniqueWords(str) {
  if (typeof str !== "string" || !str) {
    throw new Error("input should be non-empty string");
  }
  let result = [];
  let tempArr = str.split(/\W+/);
  const filterUniqueWords = (element) =>
    result.includes(element.toLowerCase())
      ? 0
      : result.push(element.toLowerCase());

  tempArr.map(filterUniqueWords);

  const deleteEmptyElements = (e) => e !== "";

  return result.filter(deleteEmptyElements).sort();
}

console.log(
  filterUniqueWords("hello Hello Alan Zero ZERO zero wake WAKE  ALPHABET alpha")
);

/// 2.3

function getAverageGrade(arr) {
  if (
    Array.isArray(arr) &&
    arr.every(
      (student) =>
        typeof student.grades === "number" && typeof student.name === "string"
    )
  ) {
    let count = 0;
    let sumGrades = 0;
    const addStudentGrades = (student) => {
      sumGrades += student.grades;
      count++;
    };
    arr.map(addStudentGrades);
    return sumGrades / count;
  } else {
    throw new Error("input should be non-empty array");
  }
}

let ivan = { name: "ivan", grades: 60 };
let glib = { name: "glib", grades: 70 };
let mab = { name: "gli", grades: 80 };
let more = { name: "glib", grades: 90 };
console.log(getAverageGrade([ivan, glib, mab, more]));

/// 3.1

function createCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

/// 3.2

function repeatFunction(callback, num, ...args) {
  if (typeof callback !== "function" || typeof num !== "number") {
    throw new Error("input should be function and number");
  }
  if (num < 0) {
    return function () {
      while (true) {
        callback(...args);
      }
    };
  } else {
    return function () {
      for (let i = 0; i < num; i++) {
        callback(...args);
      }
    };
  }
}

function print(message) {
  console.log(message);
}
const executeF = repeatFunction(print, 21, "hello world");
executeF();

/// 4.1

function calculateFactorial(n, accum = 1) {
  if (typeof n !== "number" || n < 0) {
    throw new Error("n should be a positive number!");
  } else if (n === 0) {
    return accum;
  } else {
    return calculateFactorial(n - 1, n * accum);
  }
}

console.log(calculateFactorial(12));
/// 4.2

function power(base, exponent, accum = 1) {
  if (typeof base !== "number" || typeof exponent !== "number") {
    throw new Error("base and exponent should be numbers");
  } else if (exponent === 0) {
    return accum;
  } else if (exponent > 0) {
    return power(base, exponent - 1, base * accum);
  } else if (exponent < 0) {
    return power(base, exponent + 1, accum / base);
  }
}

console.log(power(-2, 10));

/// 5.1

function lazyMap(arr, func) {
  if (!Array.isArray(arr) || arr.length < 1 || typeof func !== "function") {
    throw new Error("input should be non-empty array and a function");
  }
  const mappedArr = arr.map(func);
  let index = 0;
  return {
    next: function () {
      return index < mappedArr.length
        ? { value: mappedArr[index++], done: false }
        : { value: "no values in array left", done: true };
    },
  };
}

function addOne(x) {
  return x + 1;
}

let arr = [1, 3, 5, 7, 9, 11];

const lazyAdd = lazyMap(arr, addOne);

console.log(lazyAdd.next().value);
console.log(lazyAdd.next().value);

/// 5.2

function fibonacciGenerator() {
  let arr = [1, 1];
  let index = 2;

  return {
    next: function () {
      if (index >= arr.length) {
        const nextFibNum = arr[arr.length - 1] + arr[arr.length - 2];
        arr.push(nextFibNum);
      }
      return { value: arr[index++], done: false };
    },
  };
} 

const lazyFibonacci = fibonacciGenerator();

console.log(lazyFibonacci.next().value);
console.log(lazyFibonacci.next().value);
