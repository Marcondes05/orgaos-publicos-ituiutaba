import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orgaos from "./pages/Orgaos";
import Secretarias from "./pages/Secretarias";
import TiposOrgaos from "./pages/TiposOrgao";

function RotaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        >
          <Route index element={<Navigate to="/orgaos" />} />
          <Route path="orgaos" element={<Orgaos />} />
          <Route path="secretarias" element={<Secretarias />} />
          <Route path="tipos-orgaos" element={<TiposOrgaos />} />
        </Route>

        {/* Qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
