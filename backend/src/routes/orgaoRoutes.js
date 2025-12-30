const express = require("express");
const router = express.Router();
const controller = require("../controllers/orgaoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listarOrgaos);
router.post("/", authMiddleware, controller.criarOrgao);
router.put("/:id", authMiddleware, controller.atualizarOrgao);
router.delete("/:id", authMiddleware, controller.desativarOrgao);

module.exports = router;
