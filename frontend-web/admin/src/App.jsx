import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Orgaos from "./pages/Orgaos";
import Secretarias from "./pages/Secretarias";
import TiposOrgaos from "./pages/TiposOrgao";

/* ===============================
   ROTA PRIVADA
=============================== */
function RotaPrivada({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* ===============================
            LOGIN (ROTA PÚBLICA)
        =============================== */}
        <Route
          path="/login"
          element={token ? <Navigate to="/" replace /> : <Login />}
        />

        {/* ===============================
            ÁREA ADMIN (ROTAS PRIVADAS)
        =============================== */}
        <Route
          path="/"
          element={
            <RotaPrivada>
              <Dashboard />
            </RotaPrivada>
          }
        >
          <Route path="orgaos" element={<Orgaos />} />
          <Route path="secretarias" element={<Secretarias />} />
          <Route path="tipos-orgaos" element={<TiposOrgaos />} />
        </Route>

        {/* ===============================
            FALLBACK
        =============================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
