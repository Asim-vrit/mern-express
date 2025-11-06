const { userList } = require("../assets/users");
const express = require("express");
const router = express.Router();

router.post("/login", (request, response) => {
  const body = request.body;
  if (!body.username || !body.password) {
    response
      .status(400)
      .json({ error: "Request must contain username and password" });
    return;
  }
  const { username, password } = request.body;
  const user = userList.filter((user) => user.username === username)[0];
  if (!user) {
    response.status(401).json({ error: "Invalid credentials" });
    return;
  }
  const doesPasswordMatch = user.password === password;
  if (!doesPasswordMatch) {
    response.status(401).json({ error: "Invalid credentials" });
    return;
  }
  response.json({
    result: "Logged in successfully",
    token: "alkjdvhgasbdasdjnbasdhb23hi8g4uu2c",
  });
});

module.exports = router;
