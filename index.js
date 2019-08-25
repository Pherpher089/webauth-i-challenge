//Import server object
const server = require("./server.js");

//Assign port variable
const PORT = process.env.PORT || 5000;

//Set the server to listen on PORT or 5000
server.listen(PORT, () => console.log(`Magic happening on port: ${PORT}`));
