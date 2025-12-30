const prisma = require("../prisma/client");

async function listarSecretarias(req, res) {
  try {
    const secretarias = await prisma.secretaria.findMany({
      where: { ativo: true },
    });
    res.json(secretarias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar secretarias" });
  }
}


async function criarSecretaria(req, res) {
  try {
    const { nome, endereco, telefone, email } = req.body;

    if (!nome || !endereco) {
      return res.status(400).json({
        error: "Nome e endereço são obrigatórios",
      });
    }

    const secretaria = await prisma.secretaria.create({
      data: {
        nome,
        endereco,
        telefone,
        email,
      },
    });

    res.status(201).json(secretaria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar secretaria" });
  }
}

async function atualizarSecretaria(req, res) {
  try {
    const { id } = req.params;
    const { nome, endereco, telefone, email } = req.body;

    if (!nome || !endereco) {
      return res.status(400).json({
        error: "Nome e endereço são obrigatórios",
      });
    }

    const secretaria = await prisma.secretaria.update({
      where: { id: Number(id) },
      data: {
        nome,
        endereco,
        telefone,
        email,
      },
    });

    res.json(secretaria);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar secretaria" });
  }
}

async function desativarSecretaria(req, res) {
  try {
    const { id } = req.params;

    await prisma.secretaria.update({
      where: { id: Number(id) },
      data: { ativo: false },
    });

    res.json({ message: "Secretaria desativada" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao desativar secretaria" });
  }
}


module.exports = {
  listarSecretarias,
  criarSecretaria,
  atualizarSecretaria,
  desativarSecretaria,
};

