import { Link, Outlet, useNavigate } from "react-router-dom";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Painel Administrativo</h1>
      <p>Bem-vindo, {usuario?.nome}</p>

      <button onClick={logout}>Sair</button>

      <hr style={{ margin: "20px 0" }} />

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/tipos-orgaos">
          <button>Tipos de Órgão</button>
        </Link>

        <Link to="/secretarias">
          <button>Secretarias</button>
        </Link>

        <Link to="/orgaos">
          <button>Órgãos Públicos</button>
        </Link>
      </nav>

      <hr />

      {/* Aqui entram as páginas protegidas */}
      <Outlet />
    </div>
  );
}

export default Dashboard;
