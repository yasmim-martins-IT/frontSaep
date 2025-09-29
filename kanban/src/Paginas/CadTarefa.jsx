import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadastroTarefa.css";

// Validação (usando os valores “raw” do Django)
const schemaCadTarefa = z.object({
  usuario: z
    .string()
    .trim()
    .min(1, "Informe o ID do usuário")
    .regex(/^\d+$/, "O ID deve ser numérico"),
  descricao: z
    .string()
    .trim()
    .min(5, "Descrição deve ter no mínimo 5 caracteres")
    .max(250, "Descrição pode ter no máximo 250 caracteres"),
  setor: z
    .string()
    .trim()
    .min(2, "Informe o setor da tarefa")
    .max(250, "O setor pode ter no máximo 250 caracteres"),
  prioridade: z.enum(["baixo", "medio", "alto"], {
    errorMap: () => ({ message: "Selecione a prioridade" }),
  }),
  status: z.enum(["a_fazer", "fazendo", "concluido"], {
    errorMap: () => ({ message: "Selecione o status" }),
  }),
});

export function CadastroTarefa() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaCadTarefa),
    defaultValues: {
      prioridade: "baixo",
      status: "a_fazer",
    },
  });

  async function obterDados(data) {
    try {
      // Converte usuário para número
      const payload = {
        ...data,
        usuario: parseInt(data.usuario, 10),
      };

      await axios.post("http://127.0.0.1:8000/tarefas/", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ Tarefa cadastrada com sucesso!");
      reset();
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(`❌ Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("❌ Houve um erro durante o cadastro");
      }
    }
  }

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(obterDados)}
        className="formulario"
        aria-label="Formulário de cadastro de tarefa"
      >
        <h2 id="form-title">📝 Cadastro de Tarefa</h2>

        <label htmlFor="usuario">ID do Usuário</label>
        <input
          id="usuario"
          type="text"
          placeholder="Ex: 1"
          {...register("usuario")}
          aria-invalid={!!errors.usuario}
          aria-describedby={errors.usuario ? "erro-usuario" : undefined}
        />
        {errors.usuario && (
          <p id="erro-usuario" className="erro" role="alert">
            {errors.usuario.message}
          </p>
        )}

        <label htmlFor="descricao">Descrição</label>
        <input
          id="descricao"
          type="text"
          placeholder="Digite a descrição da tarefa"
          {...register("descricao")}
          aria-invalid={!!errors.descricao}
          aria-describedby={errors.descricao ? "erro-descricao" : undefined}
        />
        {errors.descricao && (
          <p id="erro-descricao" className="erro" role="alert">
            {errors.descricao.message}
          </p>
        )}

        <label htmlFor="setor">Setor</label>
        <input
          id="setor"
          type="text"
          placeholder="Ex: Financeiro"
          {...register("setor")}
          aria-invalid={!!errors.setor}
          aria-describedby={errors.setor ? "erro-setor" : undefined}
        />
        {errors.setor && (
          <p id="erro-setor" className="erro" role="alert">
            {errors.setor.message}
          </p>
        )}

        <label htmlFor="prioridade">Prioridade</label>
        <select
          id="prioridade"
          {...register("prioridade")}
          aria-invalid={!!errors.prioridade}
          aria-describedby={errors.prioridade ? "erro-prioridade" : undefined}
        >
          <option value="baixo">Baixo</option>
          <option value="medio">Médio</option>
          <option value="alto">Alto</option>
        </select>
        {errors.prioridade && (
          <p id="erro-prioridade" className="erro" role="alert">
            {errors.prioridade.message}
          </p>
        )}

        <label htmlFor="status">Status</label>
        <select
          id="status"
          {...register("status")}
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? "erro-status" : undefined}
        >
          <option value="a_fazer">A fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluido">Concluído</option>
        </select>
        {errors.status && (
          <p id="erro-status" className="erro" role="alert">
            {errors.status.message}
          </p>
        )}

        <button type="submit" aria-label="Cadastrar nova tarefa">
          ➕ Cadastrar Tarefa
        </button>
      </form>
    </div>
  );
}
