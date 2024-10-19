import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ClienteList from "./pages/ClienteList";
import ClienteForm from "./pages/ClienteForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClienteList />} />
        <Route path="/clientes" element={<ClienteList />} />
        <Route path="/clientes/cadastro" element={<ClienteForm />} />
        <Route path="/clientes/editar/:id" element={<ClienteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
