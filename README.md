# Student Management REST API

This is my assignment for making a REST API using Node.js and Express. Basically it's a simple backend where you can add, view, update and delete student records. There's no real database, I'm just storing everything in an array in memory (so if you restart the server, it goes back to the 2 sample students I added).

## Folder Structure

```
student-service/
├── routes/
│   └── studentRoutes.js   -> all the /students routes (GET, POST, PUT, DELETE)
├── middleware/
│   └── logger.js          -> my custom middleware (logging + validation)
├── data/
│   └── students.js        -> fake "database", just an array of students
├── app.js                 -> main file, this is what you run
└── package.json
```

## How to run it

1. Install the dependencies first
```
npm install
```

2. Then start the server
```
node app.js
```

You should see this in the terminal:
```
Student Management API running on http://localhost:3000
```

That's it, it's running on port 3000 now.

## What routes are there

Base route is `/students`

| Method | Route | What it does |
|--------|-------|---------------|
| GET | /students | gives you all the students |
| GET | /students/:id | gives you one student by their id |
| POST | /students | adds a new student |
| PUT | /students/:id | updates a student's details |
| DELETE | /students/:id | deletes a student |

For POST and PUT you need to send this in the body (as JSON):
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "age": 20,
  "course": "Computer Science"
}
```

## Middleware I made

I made 2 custom middlewares in `logger.js`:

- **requestLogger** - this just logs every request that comes in, like the method and the url and the time. It runs on literally every request (added it globally in app.js).
- **validateStudent** - this checks that you actually sent name, email, age and course when adding or updating a student. If something's missing it sends back a 400 error instead of letting it crash.

## Error handling

Tried to cover the cases mentioned in the assignment:
- if student doesn't exist -> 404
- if you forgot to send a required field -> 400
- if the id in the url isn't even a number (like /students/abc) -> 400
- if you hit some route that doesn't exist at all -> 404
- anything else that breaks -> goes to the error handler at the bottom of app.js and sends a 500

## Testing

I tested this using Postman, just hit all the routes with valid and invalid data to make sure the status codes and messages make sense. You can also just use curl if you don't wanna open Postman, e.g.

```
curl http://localhost:3000/students
```

## Notes to self

- Data resets every time the server restarts since it's not connected to a real DB, that's expected for this assignment.
- Remember error handling middleware always goes at the very end in app.js, after the routes, otherwise it won't catch anything.
