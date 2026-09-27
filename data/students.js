let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "abc@gmail.com",
    age: 19,
    course: "Computer Science",
  },
  {
    id: 2,
    name: "Isha Verma",
    email: "xyz@gmail.com",
    age: 18,
    course: "AI/ML",
  },
];

let nextId = 3;

module.exports = {
  students,
  getNextId: () => nextId++,
};
