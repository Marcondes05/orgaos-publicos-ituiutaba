const express = require("express");
const router = express.Router();
const controller = require("../controllers/tipoOrgaoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listarTipos);
router.post("/", authMiddleware, controller.criarTipo);
router.put("/:id", authMiddleware, controller.atualizarTipo);
router.delete("/:id", authMiddleware, controller.desativarTipo);

module.exports = router;
