const express = require("express");
const router = express.Router();
const { productList } = require("../assets/products");

router.get("/products", (request, response) => {
  response.json(productList);
});

router.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = productList.filter((product) => product.id === numId)[0];
  response.json(productbyId || {});
});

router.post("/products", (request, response) => {
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

router.put("/products/:id", (request, response) => {
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

router.delete("/products/:id", (request, response) => {
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

module.exports = router;
