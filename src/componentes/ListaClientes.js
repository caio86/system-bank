import React, { useEffect, useState } from "react";
import { deleteCliente, getClientes } from "../services/ClienteService";

const ListaClientes = ({ onEdit }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao carregar clientes:", err);
      }
    };

    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
    } catch (err) {
      console.error("Erro ao deletar clientes:", err);
    }
  };

  return (
    <>
      <h2> Clientes </h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>{cliente.email}</td>
              <td>
                <button onClick={() => onEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListaClientes;
