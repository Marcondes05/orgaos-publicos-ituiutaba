const express = require("express");
const router = express.Router();
const controller = require("../controllers/orgaoController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listarOrgaos);
router.post("/", authMiddleware, controller.criarOrgao);


module.exports = router;
