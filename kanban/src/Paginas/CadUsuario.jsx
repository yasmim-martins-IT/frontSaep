// src/pages/CadUsuario.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadUsuario.css";

const schemaCadUsuario = z.object({
  nome: z
    .string()
    .trim()
    .min(1, "Preencha o campo nome, por favor")
    .max(30, "O campo permite até 30 caracteres")
    .regex(/^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)*$/, "O nome só pode conter letras e espaço"),
  email: z
    .string()
    .trim()
    .min(1, "Preencha o campo email, por favor")
    .max(50, "O campo permite até 50 caracteres")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Insira um email válido"),
});

export default function CadUsuario({ onUserCreated }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schemaCadUsuario) });

  async function obterDados(data) {
    try {
      const response = await axios.post("http://127.0.0.1:8000/usuarios/", data);
      alert("✅ Usuário cadastrado com sucesso!");
      reset();
      if (onUserCreated) onUserCreated(response.data);
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.email) {
        alert("❌ Email já cadastrado!");
      } else {
        alert("❌ Erro no cadastro!");
      }
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(obterDados)} className="formulario" aria-label="Formulário de cadastro de usuário">
        <h2 id="form-title">Cadastro de Usuário</h2>

        <label htmlFor="nome">Nome:</label>
        <input
          id="nome"
          type="text"
          {...register("nome")}
          placeholder="José da Silva"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? "erro-nome" : undefined}
        />
        {errors.nome && (
          <p id="erro-nome" className="erro" role="alert">
            {errors.nome.message}
          </p>
        )}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="email@dominio.com.br"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "erro-email" : undefined}
        />
        {errors.email && (
          <p id="erro-email" className="erro" role="alert">
            {errors.email.message}
          </p>
        )}

        <button type="submit" aria-label="Cadastrar novo usuário">Cadastrar</button>
      </form>
    </div>
  );
}
