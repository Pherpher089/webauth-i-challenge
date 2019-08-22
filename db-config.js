//Package imports
const knex = require("knex");

//Getting db config from knexfile
const config = require("./knexfile.js");

//Creating db object
const db = knex(config.development);

//Exporting db object
module.exports = db;
