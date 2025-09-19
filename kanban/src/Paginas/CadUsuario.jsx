// src/pages/CadUsuario.jsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./CadUsuario.css"; // Import do CSS

const schemaCadUsuario = z.object({
  nome: z.string()
    .min(1, "Preencha o campo nome, por favor")
    .max(30, "O campo permite até 30 caracteres")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/ , "O nome só pode ter letras e espaço"),
  email: z.string()
    .min(1, "Preencha o campo email, por favor")
    .max(50, "O campo permite até 50 caracteres")
    .email("Insira um email válido")
    .regex(/^[A-Za-zÀ-ÿ\s]+$/ , "insira um email valido") ,  
});

export function CadUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schemaCadUsuario) });

  async function obterDados(data) {
    try {
      await axios.post("http://127.0.0.1:8000/usuario/", data);
      alert("✅ Usuário cadastrado com sucesso!");
      reset();
    } catch (error) {
      alert("❌ Houve um erro durante o cadastro");
      console.error("Erro no cadastro:", error);
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
