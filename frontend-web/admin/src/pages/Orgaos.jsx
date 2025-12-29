import { useEffect, useState } from "react";
import api from "../services/api";

function Orgaos() {
  const [orgaos, setOrgaos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [secretarias, setSecretarias] = useState([]);

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [telefone, setTelefone] = useState("");
  const [horario, setHorario] = useState("");
  const [tipoOrgaoId, setTipoOrgaoId] = useState("");
  const [secretariaId, setSecretariaId] = useState("");
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const [orgaosRes, tiposRes, secretariasRes] = await Promise.all([
        api.get("/orgaos"),
        api.get("/tipos-orgaos"),
        api.get("/secretarias"),
      ]);

      setOrgaos(orgaosRes.data);
      setTipos(tiposRes.data);
      setSecretarias(secretariasRes.data);
    } catch (error) {
      setErro("Erro ao carregar dados");
    }
  }

  async function criarOrgao(e) {
    e.preventDefault();
    setErro("");

    if (
      !nome ||
      !endereco ||
      !latitude ||
      !longitude ||
      !tipoOrgaoId ||
      !secretariaId
    ) {
      setErro("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      await api.post("/orgaos", {
        nome,
        endereco,
        latitude: Number(latitude),
        longitude: Number(longitude),
        telefone,
        horario,
        tipoOrgaoId: Number(tipoOrgaoId),
        secretariaId: Number(secretariaId),
      });

      setNome("");
      setEndereco("");
      setLatitude("");
      setLongitude("");
      setTelefone("");
      setHorario("");
      setTipoOrgaoId("");
      setSecretariaId("");

      carregarDados();
    } catch (error) {
      setErro("Erro ao criar órgão");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div>
      <h2>Órgãos Públicos</h2>

      <form onSubmit={criarOrgao} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nome do órgão"
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
          type="number"
          step="any"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="number"
          step="any"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
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
          type="text"
          placeholder="Horário de funcionamento"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <select
          value={tipoOrgaoId}
          onChange={(e) => setTipoOrgaoId(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        >
          <option value="">Selecione o tipo</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select>

        <select
          value={secretariaId}
          onChange={(e) => setSecretariaId(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        >
          <option value="">Selecione a secretaria</option>
          {secretarias.map((sec) => (
            <option key={sec.id} value={sec.id}>
              {sec.nome}
            </option>
          ))}
        </select>

        <button type="submit">Adicionar</button>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <ul>
        {orgaos.map((orgao) => (
          <li key={orgao.id}>
            <strong>{orgao.nome}</strong> <br />
            {orgao.endereco} <br />
            Tipo: {orgao.tipoOrgao?.nome} <br />
            Secretaria: {orgao.secretaria?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orgaos;
