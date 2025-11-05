const express = require("express");
const router = express.Router();
const { userList } = require("../assets/users");

router.get("/users", (request, response) => {
  response.json(userList);
});

router.get("/users/:id", (request, response) => {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const userByID = userList.filter((user) => user.id === numId)[0];
  response.json(userByID || {});
});

router.post("/users", (request, response) => {
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

router.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const req = request.body;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = userList.filter((product) => product.id === numId)[0];
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

router.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const productbyId = userList.filter((product) => product.id === numId)[0];
  if (!productbyId) {
    response.status(404).json({ error: "product not found" });
    return;
  }
  response.json({ result: productbyId.title + " deleted" });
});

module.exports = router;
