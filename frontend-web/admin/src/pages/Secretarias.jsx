import { useEffect, useState } from "react";
import api from "../services/api";
import "./Secretarias.css";

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
    <div className="page">
      <div className="card">
        <h2 className="section-title">Secretarias</h2>

        <form onSubmit={criarSecretaria} className="orgaos-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="text"
            placeholder="Endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {erro && <p className="error">{erro}</p>}

          <button type="submit">Adicionar Secretaria</button>
        </form>
      </div>

      <div className="card">
        <h3 className="section-title">Secretarias cadastradas</h3>

        <ul className="orgaos-list">
          {secretarias.map((sec) => (
            <li key={sec.id}>
              <strong>{sec.nome}</strong><br />
              {sec.endereco}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default Secretarias;
