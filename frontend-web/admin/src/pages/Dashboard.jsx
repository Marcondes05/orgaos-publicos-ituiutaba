import { useState } from "react";
import TiposOrgao from "./TiposOrgao";
import Secretarias from "./Secretarias";
import Orgaos from "./Orgaos";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [pagina, setPagina] = useState("tipos");

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, {usuario?.nome}</p>

      <button onClick={logout}>Sair</button>

      <hr style={{ margin: "20px 0" }} />

      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPagina("tipos")}>
          Tipos de Órgão
        </button>
        <button onClick={() => setPagina("secretarias")}>
          Secretarias
        </button>
        <button onClick={() => setPagina("orgaos")}>
          Órgãos Públicos
        </button>
      </nav>

      {pagina === "tipos" && <TiposOrgao />}
      {pagina === "secretarias" && <Secretarias />}
      {pagina === "orgaos" && <Orgaos />}
    </div>
  );
}

export default Dashboard;
