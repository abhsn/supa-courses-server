const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());

const courses = require("./data/courses.json");

app.get('/', (req, res) => {
	res.send("Supa Courses API running...");
});

app.get('/api/courses', (req, res) => {
	res.send(courses);
});

app.get('/api/course/:id', (req, res) => {
	const id = req.params.id;
	const filtered = courses.filter(course => course.id === id);
	res.send(filtered);
});

app.listen(port, () => console.log("Listening on port", port));