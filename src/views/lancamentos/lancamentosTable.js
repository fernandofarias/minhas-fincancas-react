import React from 'react';

import { Button } from 'primereact/button';

function LancamentosTable(props) {

    const linhasResultado = props.lancamentos.map(lancamento => {
        return (
            <tr className="table-info" key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>R$ {lancamento.valor}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.statusLancamento}</td>
                <td>
                    <Button onClick={() => props.alterarStatusLancamento(lancamento, "EFETIVADO")} icon="pi pi-check" className="p-button-rounded p-button-success" disabled={lancamento.statusLancamento !== 'PENDENTE'}/>
                    <Button onClick={() => props.alterarStatusLancamento(lancamento, "CANCELADO")} icon="pi pi-times" className="p-button-rounded p-button-danger" disabled={lancamento.statusLancamento !== 'PENDENTE'}/>
                    <Button onClick={() => props.editarLancamento(lancamento.id)} icon="pi pi-book" className="p-button-rounded p-button-help" />
                    <Button onClick={() => props.excluirLancamento(lancamento)} icon="pi pi-trash" className="p-button-rounded p-button-danger" />
                </td>
            </tr>
        )
    })

    return ( 
        <>
        {linhasResultado.length > 0 
        ? 
            null 
        : 
            <div className="alert alert-dismissible alert-warning">
                <strong>Atenção!</strong> Não há lançamentos cadastrados.
            </div>   
        }
        <table className="table table-hover">
            <thead> 
            <tr className="table-dark">
                    <th scope="row">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situaçoes</th>
                    <th scope="col">Ações</th>
                </tr>    
            </thead>  
            <tbody>
                {linhasResultado}
            </tbody>     
        </table>
        </>
     );
}

export default LancamentosTable;