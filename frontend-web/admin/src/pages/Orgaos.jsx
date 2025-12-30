import { useEffect, useState } from "react";
import api from "../services/api";
import MapPicker from "../components/MapPicker";

function Orgaos() {
  const [orgaos, setOrgaos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [secretarias, setSecretarias] = useState([]);

  // Dados do órgão
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [horario, setHorario] = useState("");
  const [tipoOrgaoId, setTipoOrgaoId] = useState("");
  const [secretariaId, setSecretariaId] = useState("");

  // Localização
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [buscarMapa, setBuscarMapa] = useState(false);

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
      !tipoOrgaoId ||
      !secretariaId ||
      latitude === null ||
      longitude === null
    ) {
      setErro(
        "Preencha todos os campos obrigatórios e confirme a localização no mapa"
      );
      return;
    }

    try {
      await api.post("/orgaos", {
        nome,
        endereco,
        telefone,
        horario,
        latitude,
        longitude,
        tipoOrgaoId: Number(tipoOrgaoId),
        secretariaId: Number(secretariaId),
      });

      // Limpar formulário
      setNome("");
      setEndereco("");
      setTelefone("");
      setHorario("");
      setTipoOrgaoId("");
      setSecretariaId("");
      setCep("");
      setNumero("");
      setLatitude(null);
      setLongitude(null);
      setBuscarMapa(false);

      carregarDados();
    } catch (error) {
      setErro("Erro ao criar órgão público");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  // Endereço usado pelo mapa (CEP + número)
  const enderecoCompleto =
    buscarMapa && cep && numero
      ? `${cep}, ${numero}, Ituiutaba, MG, Brasil`
      : null;

  return (
    <div>
      <h2>Órgãos Públicos</h2>

      <form onSubmit={criarOrgao} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Nome do órgão"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Endereço (Rua / Bairro)"
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
          <option value="">Selecione o tipo de órgão</option>
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

        <hr />

        <h4>Localização</h4>

        <input
          type="text"
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <input
          type="text"
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          style={{ display: "block", marginBottom: "8px", padding: "6px" }}
        />

        <button
          type="button"
          onClick={() => setBuscarMapa(true)}
          style={{ marginBottom: "10px" }}
        >
          Buscar no mapa
        </button>

        <MapPicker
          enderecoCompleto={enderecoCompleto}
          onLocationChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />

        {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}

        <button type="submit" style={{ marginTop: "15px" }}>
          Adicionar Órgão
        </button>
      </form>

      <hr />

      <h3>Órgãos cadastrados</h3>

      <ul>
        {orgaos.map((orgao) => (
          <li key={orgao.id} style={{ marginBottom: "15px" }}>
            <strong>{orgao.nome}</strong> <br />
            {orgao.endereco} <br />
            Telefone: {orgao.telefone || "Não informado"} <br />
            Horário: {orgao.horario || "Não informado"} <br />
            Tipo: {orgao.tipoOrgao?.nome} <br />
            Secretaria: {orgao.secretaria?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orgaos;
