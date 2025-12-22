const prisma = require("../prisma/client");

async function listarTipos(req, res) {
  try {
    const tipos = await prisma.tipoOrgao.findMany();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tipos de órgão" });
  }
}

async function criarTipo(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const tipo = await prisma.tipoOrgao.create({
      data: { nome },
    });

    res.status(201).json(tipo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tipo de órgão" });
  }
}

module.exports = {
  listarTipos,
  criarTipo,
};
