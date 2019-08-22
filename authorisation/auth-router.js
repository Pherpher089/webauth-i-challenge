const express = require("express");
const bcrypt = require("bcrypt");

const db = require("./auth-model.js");

const router = express.Router();

router.post("/register", async (req, res) => {
	const user = req.body;

	const hash = bcrypt.hashSync(user.password, 12);

	user.password = hash;

	try {
		const saved = await db.register(user);
		res.status(200).json(saved);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

router.get("/users", async (req, res) => {
	try {
		const users = await db.getUsers();
		res.status(200).json(users);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

router.post("/login", async (req, res) => {
	const passGuess = req.body.password;
	console.log(`pass guess = ${passGuess}`);
	try {
		const user = await db.findUser(req.body.username);
		console.log(user.username);
		if (user && bcrypt.compareSync(passGuess, user.password)) {
			res.status(200).json({ message: `Welcom ${user.username}` });
		} else {
			res.status(401).json({ message: "invalid credentials" });
		}
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

module.exports = router;
