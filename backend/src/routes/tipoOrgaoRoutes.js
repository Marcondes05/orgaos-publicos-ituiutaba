const express = require("express");
const router = express.Router();
const controller = require("../controllers/tipoOrgaoController");

router.get("/", controller.listarTipos);
router.post("/", controller.criarTipo);

module.exports = router;
