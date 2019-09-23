const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.addListener("newSale", () => {
  console.log("Another way!");
});
myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});
myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas");
});
myEmitter.on("newSale", stock => {
  console.log(`There are ${stock} items left in stock`);
});
myEmitter.emit("newSale", 9);

////////////////////////////

const server = http.createServer();
server.on("request", (req, res) => {
  console.log(req.url);
  console.log("Request received!");
  res.end("Request send received");
}); //.on ==> listen to some event to happen

server.on("request", (req, res) => {
  console.log("Another request 😄");
}); //.on ==> listen to some event to happen

server.on("close", (req, res) => {
  console.log("Server Closed");
}); //.on ==> listen to some event to happen

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
