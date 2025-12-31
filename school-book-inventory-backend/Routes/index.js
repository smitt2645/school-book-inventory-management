const express = require("express");
const router = express.Router();

router.use("/board", require("./board.js"));
router.use("/medium", require("./medium.js"));
router.use("/class", require("./class.js"));
router.use("/year", require("./academic_year.js"));
router.use("/book", require("./book.js"));
router.use("/book-set", require("./bookSet.js"));

module.exports = router;
