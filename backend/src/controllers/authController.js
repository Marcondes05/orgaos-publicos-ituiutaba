const prisma = require("../prisma/client");
const bcrypt = require("bcryptjs");

async function criarAdmin(req, res) {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        error: "Nome, email e senha são obrigatórios",
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });

    res.status(201).json({
      message: "Administrador criado com sucesso",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar administrador" });
  }
}

const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios",
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
}


module.exports = {
  criarAdmin,
  login,
};
