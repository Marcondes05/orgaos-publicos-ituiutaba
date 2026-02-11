import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenValid, logout } from "../utils/auth";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!isTokenValid() || !usuario) {
      logout();
      navigate("/login", { replace: true });
    }
  }, [navigate, usuario]);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  if (!isTokenValid() || !usuario) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h1>Painel Administrativo</h1>
          <p>Bem-vindo, {usuario.nome}</p>

          <div className="dashboard-nav">
            <Link to="tipos-orgaos"><button>Tipos de Órgão</button></Link>
            <Link to="secretarias"><button>Secretarias</button></Link>
            <Link to="orgaos"><button>Órgãos Públicos</button></Link>
            <button className="danger" onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
