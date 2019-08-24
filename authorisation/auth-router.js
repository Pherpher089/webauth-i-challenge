const express = require("express");
const bcrypt = require("bcrypt");

const db = require("./auth-model.js");
const required = require("./restricted-middleware");

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

router.get("/users", required, async (req, res) => {
	try {
		const users = await db.getUsers();
		res.status(200).json(users);
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

router.post("/login", async (req, res) => {
	const passGuess = req.headers.password;
	console.log(req.headers.password);
	console.log(`pass guess = ${passGuess}`);
	try {
		const [user] = await db.findUser(req.headers.username);
		console.log(user.username);

		if (user && bcrypt.compareSync(passGuess, user.password)) {
			req.session.user = user;
			res
				.status(200)
				.json({ message: `Welcom ${user.username}! have a cookie` });
		} else {
			res.status(401).json({ message: "invalid credentials" });
		}
	} catch ({ message }) {
		res.status(500).json(message);
	}
});

router.delete("/logout", required, async (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.send("unable to logout...");
			} else {
				res.send("totsiens");
			}
		});
	} else {
		res.end();
	}
});

module.exports = router;
