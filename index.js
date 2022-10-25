const express = require("express");
const app = express();
const port = 5000;

const courses = require("./data/courses.json");

app.get('/', (req, res) => {
	res.send("Supa Courses API running...");
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.listen(port, () => console.log("Listening on port", port));