const express = require("express");
const router = express.Router();
const controller = require("../Controllers/medium");

router.post("/create", controller.create);
router.get("/", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
