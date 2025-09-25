import {Routes, Route} from 'react-router-dom';
import CadUsuario from '../Paginas/CadUsuario';
import { CadastroTarefa } from '../Paginas/CadTarefa';
import { Quadro } from '../Componentes/Quadro';
import { Inicial } from '../Paginas/Inicial';
import { GerenciarTarefas } from '../Paginas/GerenciamentoTarefas';


export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Inicial/>}>
                <Route index element={<GerenciarTarefas/>}/>
                <Route path='cadUsuario' element={<CadUsuario/>}/>
                <Route path="cadTarefa" element={<CadastroTarefa />} />

                
            </Route>
        </Routes>


    )
}