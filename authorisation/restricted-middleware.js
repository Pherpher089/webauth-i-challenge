const bcrypt = require("bcrypt");

const Auth = require("./auth-model");

module.exports = async (req, res, next) => {
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(400).json({ message: "no credentials provide" });
	}
};
