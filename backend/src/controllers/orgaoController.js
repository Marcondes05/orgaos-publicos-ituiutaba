const prisma = require("../prisma/client");

async function listarOrgaos(req, res) {
  try {
    const orgaos = await prisma.orgao.findMany({
      where: { ativo: true },
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
      email,
      horarioAbertura,
      horarioFechamento,
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
        email,
        horarioAbertura,
        horarioFechamento,
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

async function atualizarOrgao(req, res) {
  try {
    const { id } = req.params;
    const {
      nome,
      endereco,
      latitude,
      longitude,
      telefone,
      email,
      horarioAbertura,
      horarioFechamento,
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

    const orgao = await prisma.orgao.update({
      where: { id: Number(id) },
      data: {
        nome,
        endereco,
        latitude,
        longitude,
        telefone,
        email,
        horarioAbertura,
        horarioFechamento,
        tipoOrgaoId,
        secretariaId,
      },
    });

    res.json(orgao);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar órgão" });
  }
}

async function desativarOrgao(req, res) {
  try {
    const { id } = req.params;

    await prisma.orgao.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.json({ message: "Órgão desativado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao desativar órgão" });
  }
}

module.exports = {
  listarOrgaos,
  criarOrgao,
  atualizarOrgao,
  desativarOrgao,
};
