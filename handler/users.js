const { userList } = require("../assets/users");

function getAllUsers(request, response) {
  response.json(userList);
}

function getUserById(request, response) {
  const { id } = request.params;
  const numId = parseInt(id);
  if (isNaN(numId)) {
    response.status(400).json({ error: "param should be integer" });
    return;
  }
  const userByID = userList.filter((user) => user.id === numId)[0];
  response.json(userByID || {});
}

function postUsers(request, response) {
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
}

function deleteUsers(request, response) {
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
}

module.exports = { getAllUsers, getUserById, postUsers, deleteUsers };
