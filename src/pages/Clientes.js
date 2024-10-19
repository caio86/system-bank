import React, { useState } from "react";
import FormCliente from "../componentes/FormCliente";
import ListaClientes from "../componentes/ListaClientes";

const Clientes = () => {
  const [clienteEdit, setClienteEdit] = useState(null);

  const handleEdit = (cliente) => {
    setClienteEdit(cliente);
  };

  const handleSave = () => {
    setClienteEdit(null);
  };

  return (
    <>
      <ListaClientes onEdit={handleEdit} />
      <FormCliente clienteAtual={clienteEdit} onSave={handleSave} />
    </>
  );
};

export default Clientes;
