// src/pages/CadUsuario.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadUsuario.css"; // Import do CSS

const schemaCadUsuario = z.object({
  nome: z
    .string()
    .min(1, "Preencha o campo nome, por favor")
    .max(30, "O campo permite até 30 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/, "O nome só pode ter letras e espaço"),
  email: z
    .string()
    .min(1, "Preencha o campo email, por favor")
    .max(50, "O campo permite até 50 caracteres")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insira um email válido"),
});

export default function CadUsuario() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemaCadUsuario),
  });

  async function obterDados(data) {
    try {
      await axios.post("http://127.0.0.1:8000/usuarios/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("✅ Usuário cadastrado com sucesso!");
      reset(); // Limpa o formulário
    } catch (error) {
      if (error.response) {
        console.error("Erro no cadastro:", error.response.data);
        alert(`❌ Erro: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Erro no cadastro:", error);
        alert("❌ Houve um erro durante o cadastro");
      }
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(obterDados)} className="formulario">
        <h2>Cadastro de Usuário</h2>

        <label>Nome:</label>
        <input type="text" placeholder="Jose da Silva" {...register("nome")} />
        {errors.nome && <p className="erro">{errors.nome.message}</p>}

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="email@dominio.com.br"
          {...register("email")}
        />
        {errors.email && <p className="erro">{errors.email.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}
