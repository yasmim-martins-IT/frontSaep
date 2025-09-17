//formas para fzer a validção de um formulário com o react
//zod , trabalaha juntamente com outros dois componente
//"zod " + "useForm" + "resolver"


import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";



//zod trabalha com o schema que diz como deve ser feito a validação
//ele pega campo a campo com oq vi validar ,como vai validar e oq vai acontecer caso de erro 

const schemaCadUsuario = z.object({
    nome: z.string()
        .min(1,'Preencha o campo nome, por favor') //quantidade minima de caractere , oque acontece quando da erro
        .max(30, 'O campo permite até 30 caracteres'), //quantidade máxima de carectere
   

    email: z.string()
        .min(1, 'Preencha o campo email, por favor')
        .max(50, 'O campo permite até 50 caracteres')
        .email('Insira um email válido'),
    });
 
 
export function CadUsuario(){
   const {
    register,
    handleSubmit,
    formState: { errors },
    reset
} = useForm({ resolver: zodResolver(schemaCadUsuario) });
    async function obterDados(data) {
        console.log("dados inseridos", data)
        

        // chama a API
        try{
            await axios.post('http://127.0.0.1:8000/usuarios/', data);
            alert("Usuário cadastrado com sucesso!!"); // asiim que o post da certo retorna essa reposta
            reset(); // reseta o formulário
 
        }catch(errors){ // caso der ruim
            alert("Houve um erro durante o cadastro, qualquer problema chama o Paulo");
            console.error("Deu ruim hein", errors)
        }

       
    }    
    return(
        // no momento da submissão chama as funções que a gente criou
        <form className="formulario"onSubmit={handleSubmit(obterDados)}>
            <h2>Cadastro de Usuário</h2>
            <label>Nome:</label>

            {/* o register pega o valor inserido num campo input /> */}
            <input type="text" placeholder="Jose da Silva" {...register('nome')}/>
           
            {/* caso de ruim cria um novo paragrafo que exibe a mensagem */}
            {errors.nome && <p>{errors.nome.message}</p>}

            <label>E-mail:</label>
            <input type='email' placeholder="email@dominio.com.br" {...register('email')}/>
            {errors.email && <p>{errors.email.message}</p>}
 
            <button type="submit">Cadastrar</button>
        </form>
    )
}