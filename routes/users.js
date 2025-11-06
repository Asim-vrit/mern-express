const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../utils/middlewares");
const {
  getAllUsers,
  getUserById,
  postUsers,
  deleteUsers,
} = require("../handler/users");

router.get("/users", getAllUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.post("/users", authMiddleware, postUsers);
router.delete("/users/:id", authMiddleware, deleteUsers);

module.exports = router;
