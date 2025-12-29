const express = require("express");
const router = express.Router();
const controller = require("../controllers/tipoOrgaoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listarTipos);
router.post("/", authMiddleware, controller.criarTipo);

module.exports = router;
