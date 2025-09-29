import React, { useEffect, useState } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";
import "./Quadro.css";
import { DndContext } from "@dnd-kit/core";

export function Quadro() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/tarefas/";
    axios
      .get(apiURL)
      .then((response) => {
        console.log("Tarefas recebidas:", response.data);
        setTarefas(response.data);
      })
      .catch((error) => console.error("Erro ao buscar tarefas:", error));
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active) {
      const tarefasID = active.id;
      const novaColuna = over.id;

      setTarefas(prev =>
        prev.map(tarefa =>
          tarefa.i === tarefasID ? { ...tarefa, status: novaColuna } : tarefa
        )

      );
      axios.patch(`http://127.0.0.1:8000/tarefas/${tarefasID}/`,
        { status: novaColuna }
      ).catch(err => console.error("Houve um erro", err))
    }
  }

  // Agrupa tarefas por status, garantindo que qualquer valor inesperado vá para "Outras"
  const tarefasAfazer = tarefas.filter(
    (t) => t.status?.toLowerCase() === "a fazer"
  );

  const tarefasFazendo = tarefas.filter(
    (t) => t.status?.toLowerCase() === "fazendo"
  );

  const tarefasConcluido = tarefas.filter(
    (t) => t.status?.toLowerCase() === "concluído"
  );

  // Qualquer tarefa que não se encaixa nos três status anteriores
  const tarefasOutras = tarefas.filter(
    (t) =>
      !["a fazer", "fazendo", "concluído"].includes(t.status?.toLowerCase())
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <main>
      <h1>Quadro de Tarefas</h1>
      <div className="colunas-container">
        <Coluna id = "A fazer" titulo="A fazer" tarefas={tarefasAfazer} />
        <Coluna id = "Fazendo " titulo="Fazendo" tarefas={tarefasFazendo} />
        <Coluna id = "Concluido" titulo="Concluído" tarefas={tarefasConcluido} />
        {tarefasOutras.length > 0 && (
          <Coluna titulo="Outras" tarefas={tarefasOutras} />
        )}
      </div>
    </main>
    </DndContext>
  );
}
