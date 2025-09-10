const router = require("express").Router();
const { list } = require("../controller/mp.controller");

router.get("/", list);

module.exports = router;
