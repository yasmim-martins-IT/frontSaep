import '@testing-library/jest-dom' ;
import {render , screen} from '@testing-library/react' ; 
import {Cabecalho} from '../Componentes/Cabecalho' ;
import {expect , describe , it} from 'vitest'

describe("Componente cabecalho") , () => {
    it ("renderiza o titulo") , () => {
        render(<Cabecalho/>) ; 
        expect(screen.getByText("Gerenciamento de Tarefas")).toBeInTheDocument() ; 
    }
}