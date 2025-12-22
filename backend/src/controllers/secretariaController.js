const prisma = require("../prisma/client");

async function listarSecretarias(req, res) {
  try {
    const secretarias = await prisma.secretaria.findMany();
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

module.exports = {
  listarSecretarias,
  criarSecretaria,
};
