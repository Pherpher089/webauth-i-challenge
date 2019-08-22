const express = require("express");

const server = expres();

server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).send("<h1>Hello from auth challenge! </h1>");
});

module.exports = server;
