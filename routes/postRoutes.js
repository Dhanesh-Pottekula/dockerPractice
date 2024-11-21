const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePostById,
} = require("../controllers/postcontroller");
const checkUserPresent = require("../middleware/authMiddleWare");

const router = express.Router();

router.route("/").get(getAllPosts).post(checkUserPresent,createPost);

router.route("/:id").get(getPostById).patch(checkUserPresent,updatePost).delete(checkUserPresent,deletePostById);

module.exports = router;