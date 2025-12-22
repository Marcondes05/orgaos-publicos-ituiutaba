const express = require("express");
const router = express.Router();
const controller = require("../controllers/orgaoController");

router.get("/", controller.listarOrgaos);
router.post("/", controller.criarOrgao);

module.exports = router;
