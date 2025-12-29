const express = require("express");
const router = express.Router();
const controller = require("../controllers/secretariaController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", controller.listarSecretarias);
router.post("/", authMiddleware, controller.criarSecretaria);


module.exports = router;
