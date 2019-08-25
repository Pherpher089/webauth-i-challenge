const db = require("../db-config.js");

module.exports = {
	register,
	getUsers,
	findUser,
};

function register(creds) {
	return db("credentials").insert(creds);
}

function getUsers() {
	return db("credentials");
}

function findUser(username) {
	return db("credentials").where({ username });
}
