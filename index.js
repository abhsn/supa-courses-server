const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const { MongoClient } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

// initialize dotenv
require('dotenv').config();

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

// mongodb client
const uri = process.env.DB_URL;
const client = new MongoClient(uri);
const paymentsCollection = client.db('supa-courses').collection('payments');

async function connect() {

	app.post('/payment', async (req, res) => {
		const uid = req.body.uid;
		const courseId = req.body.courseId;

		const user = await paymentsCollection.findOne({ uid, courseId });

		if (!user) {
			const result = await paymentsCollection.insertOne({ uid, courseId });
			if (result.acknowledged) {
				res.json({ msg: 'success' });
			} else {
				res.json({ msg: 'error' });
			}
		} else {
			res.json({ msg: 'paid' });
		}
	})
}

connect();

app.listen(port, () => console.log("Listening on port", port));