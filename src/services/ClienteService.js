import api from "./api";

export const getClientes = async () => {
  try {
    const response = await api.get("/clientes");
    return response.data;
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    throw err;
  }
};

export const createCliente = async (cliente) => {
  try {
    const response = await api.post("/clientes/", cliente);
    return response.data;
  } catch (err) {
    console.error("Erro ao criar clientes:", err);
    throw err;
  }
};

export const updateCliente = async (id, clienteAtualizado) => {
  try {
    const response = await api.put(`/clientes/${id}/`, clienteAtualizado);
    return response.data;
  } catch (err) {
    console.error("Erro ao atualizar clientes:", err);
    throw err;
  }
};

export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  } catch (err) {
    console.error("Erro ao deletar clientes:", err);
    throw err;
  }
};
