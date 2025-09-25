// src/pages/GerenciarTarefas.jsx
import React, { useEffect, useState } from "react";
import { Quadro } from "../Componentes/Quadro";
import axios from "axios";
import "./GerenciarTarefas.css";

export function GerenciarTarefas() {
  const [tarefas, setTarefas] = useState([]);

  async function carregarTarefas() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/tarefas/");
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function excluirTarefa(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/tarefas/${id}/`);
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  async function atualizarTarefa(id, novosDados) {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/tarefas/${id}/`, novosDados);
      setTarefas((prev) =>
        prev.map((t) => (t.id === id ? response.data : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  return (
    <div className="container-gerenciar">
      <h2>Gerenciamento de Tarefas</h2>
      <div className="quadro">
        <Quadro tarefas={tarefas} onDelete={excluirTarefa} onUpdate={atualizarTarefa} />
      </div>
    </div>
  );
}
