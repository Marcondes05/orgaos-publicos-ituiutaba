const prisma = require("../prisma/client");

async function listarOrgaos(req, res) {
  try {
    const orgaos = await prisma.orgao.findMany({
      include: {
        tipoOrgao: true,
        secretaria: true,
      },
    });

    res.json(orgaos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar órgãos" });
  }
}

async function criarOrgao(req, res) {
  try {
    const {
      nome,
      endereco,
      latitude,
      longitude,
      telefone,
      horario,
      fotoUrl,
      tipoOrgaoId,
      secretariaId,
    } = req.body;

    if (
      !nome ||
      !endereco ||
      latitude === undefined ||
      longitude === undefined ||
      !tipoOrgaoId ||
      !secretariaId
    ) {
      return res.status(400).json({
        error: "Campos obrigatórios não informados",
      });
    }

    const orgao = await prisma.orgao.create({
      data: {
        nome,
        endereco,
        latitude,
        longitude,
        telefone,
        horario,
        fotoUrl,
        tipoOrgaoId,
        secretariaId,
      },
    });

    res.status(201).json(orgao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar órgão" });
  }
}

module.exports = {
  listarOrgaos,
  criarOrgao,
};
