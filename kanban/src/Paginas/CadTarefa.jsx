
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";


const schemaTarefa = z.object ({
    usuario: z.number({ required_error: "Usuário é obrigatório" }),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  setor: z.string().min(1, "Setor é obrigatório"),
  prioridade: z.enum(["baixo", "medio", "alto"]),
  status: z.enum(["a_fazer", "fazendo", "concluido"]),
}) ; 



export function CadTarefa () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(tarefaSchema),
  });

    const onSubmit = async (data) => {
    console.log("dados do formulário:", data);
    try {
      const response = await axios.post("http://127.0.0.1:8000/tarefas/", data);
      console.log("Tarefa cadastrada:", response.data);
    } catch (err) {
      console.error("Erro ao cadastrar tarefa:", err);
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Usuário (ID)</label>
        <input type="number" {...register("usuario")} />
        {errors.usuario && <p>{errors.usuario.message}</p>}
      </div>

      <div>
        <label>Descrição</label>
        <input type="text" {...register("descricao")} />
        {errors.descricao && <p>{errors.descricao.message}</p>}
      </div>

      <div>
        <label>Setor</label>
        <input type="text" {...register("setor")} />
        {errors.setor && <p>{errors.setor.message}</p>}
      </div>

      <div>
        <label>Prioridade</label>
        <select {...register("prioridade")}>
          <option value="baixo">Baixo</option>
          <option value="medio">Médio</option>
          <option value="alto">Alto</option>
        </select>
        {errors.prioridade && <p>{errors.prioridade.message}</p>}
      </div>

      <div>
        <label>Status</label>
        <select {...register("status")}>
          <option value="a_fazer">A fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluido">Concluído</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>

      <button type="submit">Cadastrar Tarefa</button>
    </form>
  );

}