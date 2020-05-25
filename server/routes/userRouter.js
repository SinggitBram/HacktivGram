const router = require("express").Router();
const UserController = require("../controllers/userController");
const authentication = require('../middlewares/authentication')

router.post("/login", UserController.loginUser);
router.post("/register", UserController.registerUser);
router.get("/all", authentication, UserController.getAllUser)
router.get("/", authentication, UserController.getDetailUser)
router.get("/:id", authentication, UserController.getDetailUserbyId)

module.exports = router;
