import { useNavigate } from "react-router-dom";
import "./Tarefa.css";
import { useDraggable } from "@dnd-kit/core";

export function Tarefa({ tarefa }) {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: tarefa.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <article className="tarefa-card" ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h3 id={tarefa.id}>{tarefa.descricao}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.setor}</dd>

        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>
      <div>
        <button type="button">Editar</button>
        <button type="button">Excluir</button>
      </div>

      <form>
        <label>Status:</label>
        <select id={tarefa.id} name="status">
          <option value="">Selecione o status</option>
          <option value="a_fazer">A fazer</option>
          <option value="fazendo">Fazendo</option>
          <option value="concluido">Pronto</option>
        </select>
        <button type="submit">Alterar Status</button>
      </form>
    </article>
  );
}
