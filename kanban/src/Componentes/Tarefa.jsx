import "./Tarefa.css";

export function Tarefa({ tarefa }) {
  return (
    <article className="tarefa-card">
      <h3 id={tarefa.id}>{tarefa.descricao}</h3>
      <dl>
        <dt>Setor:</dt>
        <dd>{tarefa.setor}</dd>

        <dt>Prioridade:</dt>
        <dd>{tarefa.prioridade}</dd>
      </dl>
      <div>
        <button type="submit">Editar</button>
        <button type="submit">Excluir</button>
      </div>

      <form>
        <label>Status:</label>
        <select id={tarefa.id} name="status">
          <option value="">Selecione o status</option>
          <option value="A fazer">A fazer</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Pronto">Pronto</option>
        </select>
        <button type="submit">Alterar Status</button>
      </form>
    </article>
  );
}
