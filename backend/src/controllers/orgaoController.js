const prisma = require("../prisma/client");

/* ===============================
   FUNÇÃO STATUS (ABERTO / FECHADO)
=============================== */
function verificarStatusOrgao(orgao) {
  if (
    !orgao.horarioAbertura ||
    !orgao.horarioFechamento ||
    !orgao.diasFuncionamento
  ) {
    return "FECHADO";
  }

  const agora = new Date();
  const diaSemanaAtual = agora.getDay(); 
  // 0 = domingo, 1 = segunda, ..., 6 = sábado

  const diasPermitidos = orgao.diasFuncionamento
    .split(",")
    .map(Number);

  if (!diasPermitidos.includes(diaSemanaAtual)) {
    return "FECHADO";
  }

  const [horaAbertura, minutoAbertura] =
    orgao.horarioAbertura.split(":").map(Number);

  const [horaFechamento, minutoFechamento] =
    orgao.horarioFechamento.split(":").map(Number);

  const abertura = new Date();
  abertura.setHours(horaAbertura, minutoAbertura, 0);

  const fechamento = new Date();
  fechamento.setHours(horaFechamento, minutoFechamento, 0);

  if (agora >= abertura && agora <= fechamento) {
    return "ABERTO";
  }

  return "FECHADO";
}

/* ===============================
   LISTAR ÓRGÃOS
=============================== */
async function listarOrgaos(req, res) {
  try {
    const orgaos = await prisma.orgao.findMany({
      where: { ativo: true },
      include: {
        tipoOrgao: true,
        secretaria: true,
      },
    });

    const orgaosComStatus = orgaos.map((orgao) => ({
      ...orgao,
      status: verificarStatusOrgao(orgao),
    }));

    res.json(orgaosComStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar órgãos" });
  }
}

/* ===============================
   CRIAR ÓRGÃO
=============================== */
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
      diasFuncionamento,
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
        diasFuncionamento,
        fotoUrl,
        tipoOrgaoId,
        secretariaId,
      },
    });

    res.status(201).json(orgao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar órgão" });
  }
}

/* ===============================
   ATUALIZAR ÓRGÃO
=============================== */
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
      diasFuncionamento,
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
        diasFuncionamento,
        tipoOrgaoId,
        secretariaId,
      },
    });

    res.json(orgao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar órgão" });
  }
}

/* ===============================
   DESATIVAR ÓRGÃO
=============================== */
async function desativarOrgao(req, res) {
  try {
    const { id } = req.params;

    await prisma.orgao.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.json({ message: "Órgão desativado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao desativar órgão" });
  }
}

module.exports = {
  listarOrgaos,
  criarOrgao,
  atualizarOrgao,
  desativarOrgao,
};
