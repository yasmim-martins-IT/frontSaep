// src/pages/CadastroTarefa.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadastroTarefa.css"; // Import do CSS que vamos criar

// Esquema de validação
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
    .max(100, "Descrição pode ter no máximo 100 caracteres"),
  setor: z
    .string()
    .trim()
    .min(2, "Informe o setor da tarefa")
    .max(50, "O setor pode ter no máximo 50 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O setor só pode conter letras e espaços"),
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
  });

  // Função para salvar a tarefa no backend
  async function obterDados(data) {
    try {
      await axios.post("http://127.0.0.1:8000/tarefas/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("✅ Tarefa cadastrada com sucesso!");
      reset();
    } catch (error) {
      if (error.response) {
        alert(`❌ Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        alert("❌ Houve um erro durante o cadastro");
      }
      console.error("Erro no cadastro:", error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(obterDados)} className="formulario">
        <h2>📝 Cadastro de Tarefa</h2>

        <label>ID do Usuário</label>
        <input type="text" placeholder="Ex: 1" {...register("usuario")} />
        {errors.usuario && <p className="erro">{errors.usuario.message}</p>}

        <label>Descrição</label>
        <input
          type="text"
          placeholder="Digite a descrição da tarefa"
          {...register("descricao")}
        />
        {errors.descricao && <p className="erro">{errors.descricao.message}</p>}

        <label>Setor</label>
        <input type="text" placeholder="Ex: Financeiro" {...register("setor")} />
        {errors.setor && <p className="erro">{errors.setor.message}</p>}

        <label>Prioridade</label>
        <select {...register("prioridade")}>
          <option value="">Selecione</option>
          <option value="baixo">Baixo</option>
          <option value="medio">Médio</option>
          <option value="alto">Alto</option>
        </select>
        {errors.prioridade && <p className="erro">{errors.prioridade.message}</p>}

        <label>Status</label>
        <select {...register("status")}>
          <option value="">Selecione</option>
          <option value="a_fazer">A fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluido">Concluído</option>
        </select>
        {errors.status && <p className="erro">{errors.status.message}</p>}

        <button type="submit">➕ Cadastrar Tarefa</button>
      </form>
    </div>
  );
}
