const router = require("express").Router();
const { create } = require("../controller/member.controller");

router.post("/", create);

module.exports = router;
