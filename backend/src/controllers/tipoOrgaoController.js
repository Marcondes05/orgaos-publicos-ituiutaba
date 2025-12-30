const prisma = require("../prisma/client");

async function listarTipos(req, res) {
  try {
    const tipos = await prisma.tipoOrgao.findMany({
      where: { ativo: true },
    });
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

async function atualizarTipo(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const tipo = await prisma.tipoOrgao.update({
      where: { id: Number(id) },
      data: { nome },
    });

    res.json(tipo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tipo de órgão" });
  }
}

async function desativarTipo(req, res) {
  try {
    const { id } = req.params;

    await prisma.tipoOrgao.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.json({ message: "Tipo de órgão desativado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao desativar tipo de órgão" });
  }
}

module.exports = {
  listarTipos,
  criarTipo,
  atualizarTipo,
  desativarTipo,
};
