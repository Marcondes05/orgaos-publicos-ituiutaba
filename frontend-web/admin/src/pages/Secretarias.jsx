import { useEffect, useState } from "react";
import api from "../services/api";

function Secretarias() {
  const [secretarias, setSecretarias] = useState([]);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");

  async function carregarSecretarias() {
    try {
      const response = await api.get("/secretarias");
      setSecretarias(response.data);
    } catch (error) {
      setErro("Erro ao carregar secretarias");
    }
  }

  async function criarSecretaria(e) {
    e.preventDefault();
    setErro("");

    if (!nome || !endereco) {
      setErro("Nome e endereço são obrigatórios");
      return;
    }

    try {
      await api.post("/secretarias", {
        nome,
        endereco,
        telefone,
        email,
      });

      setNome("");
      setEndereco("");
      setTelefone("");
      setEmail("");

      carregarSecretarias();
    } catch (error) {
      setErro("Erro ao criar secretaria");
    }
  }

  useEffect(() => {
    carregarSecretarias();
  }, []);

  return (
    <div>
      <h2>Secretarias</h2>

      <form onSubmit={criarSecretaria} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {secretarias.map((sec) => (
          <li key={sec.id}>
            <strong>{sec.nome}</strong> — {sec.endereco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Secretarias;
