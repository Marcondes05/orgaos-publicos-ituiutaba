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
  const [email, setEmail] = useState("");
  const [horarioAbertura, setHorarioAbertura] = useState("");
  const [horarioFechamento, setHorarioFechamento] = useState("");
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
        email,
        horarioAbertura,
        horarioFechamento,
        latitude,
        longitude,
        tipoOrgaoId: Number(tipoOrgaoId),
        secretariaId: Number(secretariaId),
      });

      // Limpar formulário
      setNome("");
      setEndereco("");
      setTelefone("");
      setEmail("");
      setHorarioAbertura("");
      setHorarioFechamento("");
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

  const enderecoCompleto =
    buscarMapa && cep && numero
      ? `${cep}, ${numero}, Ituiutaba, MG, Brasil`
      : null;

  return (
    <div>
      <h2>Órgãos Públicos</h2>

      <form onSubmit={criarOrgao} style={{ marginBottom: "30px" }}>
        <input
          placeholder="Nome do órgão"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
        />

        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Horário de abertura</label>
        <input
          type="time"
          value={horarioAbertura}
          onChange={(e) => setHorarioAbertura(e.target.value)}
        />

        <label>Horário de fechamento</label>
        <input
          type="time"
          value={horarioFechamento}
          onChange={(e) => setHorarioFechamento(e.target.value)}
        />

        <select
          value={tipoOrgaoId}
          onChange={(e) => setTipoOrgaoId(e.target.value)}
        >
          <option value="">Tipo do órgão</option>
          {tipos.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.nome}
            </option>
          ))}
        </select>

        <select
          value={secretariaId}
          onChange={(e) => setSecretariaId(e.target.value)}
        >
          <option value="">Secretaria</option>
          {secretarias.map((sec) => (
            <option key={sec.id} value={sec.id}>
              {sec.nome}
            </option>
          ))}
        </select>

        <h4>Localização</h4>

        <input
          placeholder="CEP"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />

        <input
          placeholder="Número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />

        <button type="button" onClick={() => setBuscarMapa(true)}>
          Buscar no mapa
        </button>

        <MapPicker
          enderecoCompleto={enderecoCompleto}
          onLocationChange={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
        />

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        <button type="submit">Adicionar Órgão</button>
      </form>

      <h3>Órgãos cadastrados</h3>

      <ul>
        {orgaos.map((orgao) => (
          <li key={orgao.id}>
            <strong>{orgao.nome}</strong> <br />
            {orgao.endereco} <br />
            Telefone: {orgao.telefone || "Não informado"} <br />
            Horário:{" "}
            {orgao.horarioAbertura && orgao.horarioFechamento
              ? `${orgao.horarioAbertura} - ${orgao.horarioFechamento}`
              : "Não informado"}
            <br />
            Tipo: {orgao.tipoOrgao?.nome} <br />
            Secretaria: {orgao.secretaria?.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orgaos;
