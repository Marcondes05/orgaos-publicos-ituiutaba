const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/criar-admin", controller.criarAdmin);
router.post("/login", controller.login);

module.exports = router;
