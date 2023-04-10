const {eventController} = require("../controllers");
const router = require("express").Router();

router.get("/", eventController.allEvent);
router.post("/", eventController.addEvent);

module.exports = router;
