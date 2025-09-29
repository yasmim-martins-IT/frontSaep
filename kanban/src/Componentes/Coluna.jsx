import React from "react";
import "./Coluna.css"; // CSS separado para os cards
import { Tarefa } from "./Tarefa"; // seu componente Tarefa.jsx
import { useDroppable } from "@dnd-kit/core";

export function Coluna({ titulo, tarefas, id }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="coluna" ref={setNodeRef}>
      <h3>{titulo}</h3>
      {tarefas.length === 0 ? (
        <p className="nenhuma-tarefa">Nenhuma tarefa</p>
      ) : (
        <div className="cards-container">
          {tarefas.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))}
        </div>
      )}
    </div>
  );
}
