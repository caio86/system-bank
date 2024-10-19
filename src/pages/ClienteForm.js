import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import CustomButton from "../componentes/Button";
import Input from "../componentes/Input";
import {
  createCliente,
  getClienteByID,
  updateCliente,
} from "../services/ClienteService";

const ClienteForm = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCliente = async (id) => {
        const response = await getClienteByID(id);
        setValue("nome", response.nome);
        setValue("cpf", response.cpf);
        setValue("email", response.email);
        setValue("observacoes", response.observacoes);
      };
      fetchCliente(Number(id));
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCliente(Number(id), data);
        Swal.fire("Sucesso!", "Cliente atualizado com sucesso!", "success");
      } else {
        await createCliente(data);
        Swal.fire("Sucesso!", "Cliente cadastrado com sucesso!", "success");
      }
      navigate("/clientes");
    } catch (err) {
      console.error("Ocorreu um erro:", err);
      Swal.fire("Erro!", "Ocorreu um erro ao salvar os dados", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h1>{id ? `Edição do Cliente: ${id}` : "Cadastro de Clientes"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input label="Nome" {...register("nome", { required: true })} />
        <Input
          label="cpf"
          mask="999.999.999-99"
          {...register("cpf", { required: true })}
        />
        <Input label="Email" {...register("email", { required: true })} />
        <Input
          label="Observações"
          {...register("observacoes", { required: true })}
        />
        <CustomButton variant="outlined" type="submit">
          {id ? "Editar" : "Salvar"}
        </CustomButton>
      </form>
    </div>
  );
};

export default ClienteForm;
