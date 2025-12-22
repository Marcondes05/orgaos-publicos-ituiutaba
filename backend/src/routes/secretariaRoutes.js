const express = require("express");
const router = express.Router();
const controller = require("../controllers/secretariaController");

router.get("/", controller.listarSecretarias);
router.post("/", controller.criarSecretaria);

module.exports = router;
