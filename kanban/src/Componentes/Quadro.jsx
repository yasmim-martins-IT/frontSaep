import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coluna } from "./Coluna";
import "./Quadro.css"; // Import do CSS

export function Quadro() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const apiURL = "http://127.0.0.1:8000/tarefas/";
    axios
      .get(apiURL)
      .then((response) => setTarefas(response.data))
      .catch((error) => console.error("Deu ruim", error));
  }, []);

const tarefasAfazer = tarefas.filter((tarefa) => tarefa.status === "a_fazer");
const tarefasFazendo = tarefas.filter((tarefa) => tarefa.status === "fazendo");
const tarefasPronto = tarefas.filter((tarefa) => tarefa.status === "concluido");

  return (
    <main>
      <h1>Quadro</h1>
      <div className="colunas-container">
        <Coluna titulo="A fazer" tarefas={tarefasAfazer} />
        <Coluna titulo="Fazendo" tarefas={tarefasFazendo} />
        <Coluna titulo="Pronto" tarefas={tarefasPronto} />
      </div>
    </main>
  );
}
