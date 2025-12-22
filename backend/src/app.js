require("dotenv").config();
const express = require("express");
const cors = require("cors");

const tipoOrgaoRoutes = require("./routes/tipoOrgaoRoutes");
const secretariaRoutes = require("./routes/secretariaRoutes");
const orgaoRoutes = require("./routes/orgaoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Órgãos Públicos de Ituiutaba funcionando 🚀" });
});

app.use("/tipos-orgaos", tipoOrgaoRoutes);
app.use("/secretarias", secretariaRoutes);
app.use("/orgaos", orgaoRoutes);

module.exports = app;
