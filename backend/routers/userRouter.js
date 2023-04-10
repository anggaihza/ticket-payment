const router = require("express").Router();

const {userController} = require("../controllers/index");

router.get("/", userController.getAll);
router.get("/:id", userController.getAllById);

module.exports = router;
