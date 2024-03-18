const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")
const postController = require("../Controllers/post.controller")
const progressController = require("../Controllers/progress.controller")
const { validation4signup , validation4login, validateComment, validate4post } = require("../Utils/joi.validate")

router.post("/createuser", validation4signup, userController.createUser)
router.post("/login", validation4login, userController.userLogin)
router.post("/post", validate4post, postController.createPost)
router.get("/getpost", postController.getPost)
router.post("/like", postController.doLike)
router.post("/comment", validateComment, postController.doComment)
router.post("/addprogress", progressController.addProgress)
router.post("/getprogress", progressController.getProgress)

module.exports = router