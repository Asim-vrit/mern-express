const express = require("express");
const bodyParser = require("body-parser");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/authentication");

const app = express();
const parser = bodyParser.json();

app.use(parser);
app.use(products);
app.use(users);
app.use(auth);

app.get("/", (request, response) => {
  response.json({ result: "welcome to fakestore api" });
});

app.listen(3001, () => {
  console.log("Hi! i am fakestore api and i am on 3001 port");
});
