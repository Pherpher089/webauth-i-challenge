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

module.exports = router;
