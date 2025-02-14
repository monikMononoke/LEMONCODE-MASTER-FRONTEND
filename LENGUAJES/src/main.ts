import "./style.css";

const fruits = ["Apple", "Orange", "Bannana", "Strawberry"];

// 1. ARRAY OPERATIONS //

// HEAD
const head = (array: string[]): string => {
  const [first] = array;
  return first;
};
console.log(head(fruits));

//  TAIL
const tail = (array: string[]): string[] => {
  const [, ...other] = array;
  return other;
};
console.log(tail(fruits));

// INIT
const init = (array: string[]): string[] => {
  return array.slice(0, -1);
};
console.log(init(fruits));

// LAST
const last = (array: string[]): string => {
  const copy = [...array];
  return copy.pop();
};
console.log(last(fruits));

// 2. CONCAT //

const concat = (a: string[], b: string[]): string[] => {
  return [...a, ...b];
};

console.log(concat(fruits, fruits));

const concatMultiple = (...array: string[]): string[] => array;

console.log(concatMultiple(...fruits, ...fruits, ...fruits));

// 3. CLONE MERGE

// CLONE

interface Person {
  name: string;
  age?: number;
  married?: boolean;
  surname?: string;
  country?: string;
}

const obj = {
  name: "Monik",
  age: 32,
};

function clone(source: Person): Person {
  return {
    ...source,
  };
}

console.log(clone(obj));
console.log(obj === clone(obj));

// MERGE

const a: Person = {
  name: "Maria",
  surname: "Ibañez",
  country: "SPA",
};

const b: Person = {
  name: "Luisa",
  age: 31,
  married: true,
};

const merge = (source: Person, target: Person): Person => ({
  ...target,
  ...source,
});

console.log(merge(a, b));

// 4. READ BOOKS

interface Book {
  title: string;
  isRead: boolean;
}

function isBookRead(books: Array<Book>, titleToSearch: string): boolean {
  const bookFound = books.find((book) => book.title === titleToSearch);

  return bookFound ? bookFound.isRead : false;
}

const books = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];
console.log(isBookRead(books, "Devastación")); // true
console.log(isBookRead(books, "Canción de hielo y fuego")); // false
console.log(isBookRead(books, "Los Pilares de la Tierra")); // false

// 5. SLOT MACHINE

class SlotMachine {
  play() {
    const array: boolean[] = [];
    for (let i = 0; i <= 2; i++) array.push(Math.random() >= 0.5);

    const find = array.find((element) => element !== true);
    find === false
      ? console.log("Suerte la próxima vez!")
      : console.log("Has ganado!");
  }
}

const machine1 = new SlotMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
