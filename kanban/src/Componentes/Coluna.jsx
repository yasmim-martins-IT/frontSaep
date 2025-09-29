import React from "react";
import "./Coluna.css"; // CSS separado para os cards

export function Coluna({ titulo, tarefas }) {
  return (
    <div className="coluna">
      <h3>{titulo}</h3>
      {tarefas.length === 0 ? (
        <p className="nenhuma-tarefa">Nenhuma tarefa</p>
      ) : (
        <div className="cards-container">
          {tarefas.map((tarefa) => (
            <div key={tarefa.id} className="card-tarefa">
              <h4 className="descricao">{tarefa.descricao}</h4>
              <p><strong>Setor:</strong> {tarefa.setor || "—"}</p>
              <p><strong>Prioridade:</strong> {tarefa.prioridade || "—"}</p>
              <p><strong>Status:</strong> {tarefa.status || "—"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
