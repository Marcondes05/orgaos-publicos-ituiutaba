import { useEffect, useState } from "react";
import api from "../services/api";
import MapPicker from "../components/MapPicker";
import "./Orgaos.css";

function Orgaos() {
  const [orgaos, setOrgaos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [secretarias, setSecretarias] = useState([]);

  const [orgaoEditando, setOrgaoEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [horarioAbertura, setHorarioAbertura] = useState("");
  const [horarioFechamento, setHorarioFechamento] = useState("");
  const [diasFuncionamento, setDiasFuncionamento] = useState([1, 2, 3, 4, 5]);
  const [tipoOrgaoId, setTipoOrgaoId] = useState("");
  const [secretariaId, setSecretariaId] = useState("");

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
    } catch {
      setErro("Erro ao carregar dados");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const enderecoCompleto =
    buscarMapa && cep && numero
      ? `${cep}, ${numero}, Ituiutaba, MG, Brasil`
      : null;

  async function salvarOrgao(e) {
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
      setErro("Preencha todos os campos obrigatórios");
      return;
    }

    const payload = {
      nome,
      endereco,
      telefone,
      email,
      horarioAbertura,
      horarioFechamento,
      diasFuncionamento: diasFuncionamento.join(","),
      latitude,
      longitude,
      tipoOrgaoId: Number(tipoOrgaoId),
      secretariaId: Number(secretariaId),
    };

    try {
      if (orgaoEditando) {
        await api.put(`/orgaos/${orgaoEditando.id}`, payload);
      } else {
        await api.post("/orgaos", payload);
      }

      limparFormulario();
      carregarDados();
    } catch {
      setErro("Erro ao salvar órgão");
    }
  }

  function limparFormulario() {
    setNome("");
    setEndereco("");
    setTelefone("");
    setEmail("");
    setHorarioAbertura("");
    setHorarioFechamento("");
    setDiasFuncionamento([1, 2, 3, 4, 5]);
    setTipoOrgaoId("");
    setSecretariaId("");
    setCep("");
    setNumero("");
    setLatitude(null);
    setLongitude(null);
    setBuscarMapa(false);
    setOrgaoEditando(null);
  }

  async function desativarOrgao(id) {
    if (!window.confirm("Deseja desativar este órgão?")) return;
    await api.put(`/orgaos/${id}/desativar`);
    carregarDados();
  }

  function editarOrgao(orgao) {
    setOrgaoEditando(orgao);
    setNome(orgao.nome);
    setEndereco(orgao.endereco);
    setTelefone(orgao.telefone || "");
    setEmail(orgao.email || "");
    setHorarioAbertura(orgao.horarioAbertura || "");
    setHorarioFechamento(orgao.horarioFechamento || "");
    setDiasFuncionamento(
      orgao.diasFuncionamento
        ? orgao.diasFuncionamento.split(",").map(Number)
        : [1, 2, 3, 4, 5]
    );
    setTipoOrgaoId(orgao.tipoOrgaoId);
    setSecretariaId(orgao.secretariaId);
    setLatitude(orgao.latitude);
    setLongitude(orgao.longitude);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleDia(dia) {
    setDiasFuncionamento((prev) =>
      prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia]
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h2 className="section-title">
          {orgaoEditando ? "Editar Órgão Público" : "Cadastrar Órgão Público"}
        </h2>

        {orgaoEditando && (
          <div className="edicao-alerta">
            ⚠️ Você está editando um órgão.
            As alterações substituirão os dados atuais.
          </div>
        )}

        <form onSubmit={salvarOrgao} className="orgaos-form">
          <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input placeholder="Endereço" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
          <input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          <input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Horário de abertura</label>
          <input type="time" value={horarioAbertura} onChange={(e) => setHorarioAbertura(e.target.value)} />

          <label>Horário de fechamento</label>
          <input type="time" value={horarioFechamento} onChange={(e) => setHorarioFechamento(e.target.value)} />

          <div className="orgaos-form-full">
            <label>Dias de funcionamento</label>
            <div className="dias-checkbox">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d, i) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    checked={diasFuncionamento.includes(i)}
                    onChange={() => toggleDia(i)}
                  />
                  {d}
                </label>
              ))}
            </div>
          </div>

          <select value={tipoOrgaoId} onChange={(e) => setTipoOrgaoId(e.target.value)}>
            <option value="">Tipo de órgão</option>
            {tipos.map((t) => (
              <option key={t.id} value={t.id}>{t.nome}</option>
            ))}
          </select>

          <select value={secretariaId} onChange={(e) => setSecretariaId(e.target.value)}>
            <option value="">Secretaria</option>
            {secretarias.map((s) => (
              <option key={s.id} value={s.id}>{s.nome}</option>
            ))}
          </select>

          <div className="orgaos-form-full">
            <h4>Localização</h4>
            <input placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} />
            <input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
            <button type="button" onClick={() => setBuscarMapa(true)}>Buscar no mapa</button>

            <MapPicker
              enderecoCompleto={enderecoCompleto}
              latitude={latitude}
              longitude={longitude}
              onLocationChange={(lat, lng) => {
                setLatitude(lat);
                setLongitude(lng);
              }}
            />

          </div>

          {erro && <p className="error">{erro}</p>}

          <div className="orgaos-actions">
            <button type="submit">
              {orgaoEditando ? "Salvar alterações" : "Adicionar órgão"}
            </button>

            {orgaoEditando && (
              <button type="button" className="secondary" onClick={limparFormulario}>
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h3 className="section-title">Órgãos cadastrados</h3>

        <ul className="orgaos-list">
          {orgaos.map((orgao) => (
            <li key={orgao.id}>
              <strong>{orgao.nome}</strong><br />
              {orgao.endereco}<br />
              Horário: {orgao.horarioAbertura} - {orgao.horarioFechamento}<br />
              Dias: {orgao.diasFuncionamento}

              <div className="orgaos-actions">
                <button onClick={() => editarOrgao(orgao)}>Editar</button>
                <button className="danger" onClick={() => desativarOrgao(orgao.id)}>
                  Desativar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Orgaos;
