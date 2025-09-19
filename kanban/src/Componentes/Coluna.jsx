import { Tarefa } from './Tarefa'; 

export function Coluna( {titulo, tarefas =[]}){
    return(
        <section>
            {/*Titulo que recebi da coluna */}
            <h2>{titulo}</h2>
            {/* manipulação de array para fazer a exibição, eu posso usar o MAP */}
            {tarefas.map(tarefa=>{
                console.log("Dados", tarefa);
                return<Tarefa key={tarefa.id} tarefa = {tarefa}/>
            })}
        </section>

    )
}
