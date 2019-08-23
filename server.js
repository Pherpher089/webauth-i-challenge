//import express
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
//import router
const authRouter = require("./authorisation/auth-router.js");

const sessionOptions = {
	name: "mycookie",
	secret: "cookiesareyumyumiwantcookies",
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
		httpOnly: true,
	},
	resave: false,
	saveUninitalized: false,
};

//set up server object with express
const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions));

//set up router
server.use("/api", authRouter);

//Set default get method on the root
server.get("/", (req, res) => {
	res.status(200).send("<h1>Hello from auth challenge! </h1>");
});

//export server
module.exports = server;
