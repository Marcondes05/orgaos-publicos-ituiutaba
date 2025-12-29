import { useEffect, useState } from "react";
import api from "../services/api";

function TiposOrgao() {
  const [tipos, setTipos] = useState([]);
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  async function carregarTipos() {
    try {
      const response = await api.get("/tipos-orgaos");
      setTipos(response.data);
    } catch (error) {
      setErro("Erro ao carregar tipos de órgão");
    }
  }

  async function criarTipo(e) {
    e.preventDefault();
    setErro("");

    if (!nome) {
      setErro("Nome é obrigatório");
      return;
    }

    try {
      await api.post("/tipos-orgaos", { nome });
      setNome("");
      carregarTipos();
    } catch (error) {
      setErro("Erro ao criar tipo de órgão");
    }
  }

  useEffect(() => {
    carregarTipos();
  }, []);

  return (
    <div>
      <h2>Tipos de Órgão</h2>

      <form onSubmit={criarTipo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome do tipo de órgão"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <button type="submit">Adicionar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {tipos.map((tipo) => (
          <li key={tipo.id}>{tipo.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default TiposOrgao;
