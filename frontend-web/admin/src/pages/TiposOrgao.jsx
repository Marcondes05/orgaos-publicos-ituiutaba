import { useEffect, useState } from "react";
import api from "../services/api";
import "./TiposOrgao.css";

function TiposOrgao() {
  const [tipos, setTipos] = useState([]);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
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
      await api.post("/tipos-orgaos", {
        nome,
        descricao,
      });

      setNome("");
      setDescricao("");
      carregarTipos();
    } catch (error) {
      setErro("Erro ao criar tipo de órgão");
    }
  }

  useEffect(() => {
    carregarTipos();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h2 className="section-title">Tipos de Órgão</h2>

        <form onSubmit={criarTipo} className="orgaos-form">
          <input
            type="text"
            placeholder="Nome do tipo de órgão"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <textarea
            placeholder="Descrição (opcional)"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
          />

          {erro && <p className="error">{erro}</p>}

          <button type="submit">Adicionar Tipo</button>
        </form>
      </div>

      <div className="card">
        <h3 className="section-title">Tipos cadastrados</h3>

        <ul className="orgaos-list">
          {tipos.map((tipo) => (
            <li key={tipo.id}>
              <strong>{tipo.nome}</strong>
              {tipo.descricao && <p>{tipo.descricao}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default TiposOrgao;
