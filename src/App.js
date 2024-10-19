import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Clientes from "./pages/Clientes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Clientes />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </Router>
  );
}

export default App;
