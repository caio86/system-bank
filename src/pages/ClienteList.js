import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomButton from "../componentes/Button";
import CustomTable from "../componentes/Table";
import { getClientes, deleteCliente } from "../services/ClienteService";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await getClientes();
      setClientes(response);
    };
    fetchClientes();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Este cliente será excluído definitivamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
    });

    if (result.isConfirmed) {
      await deleteCliente(id);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      Swal.fire("Excluído!", "O cliente foi excluído.", "success");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nome",
      label: "Nome",
    },
    {
      key: "cpf",
      label: "CPF",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "observacoes",
      label: "Observações",
    },
  ];

  return (
    <>
      <h1>Lista de Clientes</h1>
      <CustomButton
        variant="contained"
        onClick={() => navigate("/clientes/cadastro")}
      >
        Cadastar Cliente
      </CustomButton>
      <CustomTable
        columns={columns}
        data={clientes}
        onEdit={(id) => navigate(`/clientes/editar/${id}`)}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ClienteList;
