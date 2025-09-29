import React, { useEffect, useState } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";
import "./Quadro.css";

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

  // Agrupa tarefas por status, garantindo que qualquer valor inesperado vá para "Outras"
  const tarefasAfazer = tarefas.filter((t) => t.status?.toLowerCase() === "a fazer");
  const tarefasFazendo = tarefas.filter((t) => t.status?.toLowerCase() === "fazendo");
  const tarefasConcluido = tarefas.filter((t) => t.status?.toLowerCase() === "concluído");
  const tarefasOutras = tarefas.filter(
    (t) =>
      !["a fazer", "fazendo", "concluído"].includes(t.status?.toLowerCase())
  );

  return (
    <main>
      <h1>Quadro de Tarefas</h1>
      <div className="colunas-container">
        <Coluna titulo="A fazer" tarefas={tarefasAfazer} />
        <Coluna titulo="Fazendo" tarefas={tarefasFazendo} />
        <Coluna titulo="Concluído" tarefas={tarefasConcluido} />
        {tarefasOutras.length > 0 && (
          <Coluna titulo="Outras" tarefas={tarefasOutras} />
        )}
      </div>
    </main>
  );
}
