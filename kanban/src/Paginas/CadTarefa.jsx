// src/pages/CadastroTarefa.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadastroTarefa.css"; // Import do CSS que vamos criar

const schemaCadTarefa = z.object({
  usuario: z
    .string()
    .min(1, "Informe o ID do usuário")
    .regex(/^\d+$/, "O ID deve ser numérico"),
  descricao: z
    .string()
    .min(1, "Preencha a descrição da tarefa")
    .max(100, "Descrição pode ter no máximo 100 caracteres"),
  setor: z.string().min(1, "Informe o setor da tarefa"),
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

  async function obterDados(data) {
    try {
      await axios.post("http://127.0.0.1:8000/tarefas/", data);
      alert("✅ Tarefa cadastrada com sucesso!");
      reset();
    } catch (error) {
      alert("❌ Houve um erro durante o cadastro");
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
        < select {...register("status")}>
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
