//import express
const express = require("express");

//import router
const authRouter = require("./authorisation/auth-router.js");

//set up server object with express
const server = express();

//use json middle ware
server.use(express.json());

//set up router
server.use("/api", authRouter);

//Set default get method on the root
server.get("/", (req, res) => {
	res.status(200).send("<h1>Hello from auth challenge! </h1>");
});

//export server
module.exports = server;
