import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-inner">
          <h1>Painel Administrativo</h1>
          <p>Bem-vindo, {usuario?.nome}</p>

          <div className="dashboard-nav">
            <Link to="tipos-orgaos"><button>Tipos de Órgão</button></Link>
            <Link to="secretarias"><button>Secretarias</button></Link>
            <Link to="orgaos"><button>Órgãos Públicos</button></Link>
            <button className="danger" onClick={logout}>Sair</button>
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
