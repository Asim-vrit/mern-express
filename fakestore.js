const express = require("express");
const bodyParser = require("body-parser");
const { productList } = require("./assets/products");

const app = express();
const parser = bodyParser.json();

app.use(parser);

app.get("/", (request, response) => {
  response.json({ result: "welcome to fakestore api" });
});

//products api
app.get("/products", (request, response) => {
  response.json(productList);
});
app.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = productList.filter((product) => product.id === numId)[0];
  response.json(productbyId || {});
});
app.post("/products", (request, response) => {
  const req = request.body;
  const data_in_database = {
    id: 21,
    title: req?.title,
    price: req?.price,
    description: req?.description,
    category: req?.category,
    image: req?.image,
    rating: req?.rating
      ? {
          rate: req?.rating?.rate,
          count: req?.rating?.count,
        }
      : undefined,
  };
  response.json(data_in_database);
});
app.put("/products/:id", (request, response) => {
  const { id } = request.params;
  const req = request.body;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = productList.filter((product) => product.id === numId)[0];
  if (!productbyId) {
    response.status(404).json({ error: "product not found" });
    return;
  }
  const updatedProduct = {
    id: productbyId.id,
    title: req?.title || productbyId.title,
    price: req?.price || productbyId.price,
    description: req?.description || productbyId.description,
    category: req?.category || productbyId.category,
    image: req?.image || productbyId.image,
    rating: {
      rate: req?.rating?.rate || productbyId.rating.rate,
      count: req?.rating?.count || productbyId.rating.count,
    },
  };
  response.json(updatedProduct);
});
app.delete("/products/:id", (request, response) => {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = productList.filter((product) => product.id === numId)[0];
  if (!productbyId) {
    response.status(404).json({ error: "product not found" });
    return;
  }
  response.json({ result: productbyId.title + " deleted" });
});

app.listen(3001, () => {
  console.log("Hi! i am fakestore api and i am on 3001 port");
});
