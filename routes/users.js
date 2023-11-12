const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const {
  editUser,
  getAllUsers,
  getOneUser,
  deleteUser,
} = require("../controllers/userController");
router.put("/:id", verifyTokenAndAuthorization, editUser);

router.get("/", verifyTokenAndAdmin, getAllUsers);

router.get("/:id", verifyTokenAndAuthorization, getOneUser);

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
