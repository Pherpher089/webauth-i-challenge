const db = require("../db-config.js");

module.exports = {
	register,
	getUsers,
};

function register(creds) {
	return db("credentials").insert(creds);
}

function getUsers() {
	return db("credentials");
}
