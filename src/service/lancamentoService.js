import ApiService from "./apiservice";

import ErroValidacao from "../exception/erroValidacao";

class LancamentoService extends ApiService{
    constructor(){
        super("/api/lancamentos");
    }

    consultar(lancamentoFiltro){
        //ja crio a variavel com o filtro mes setado, pois sempre sera enviado o id do usuario
        let urlComFiltros = `?idUsuario=${lancamentoFiltro.idUsuario}`;

        if(lancamentoFiltro.mes){
            urlComFiltros = `${urlComFiltros}&mes=${lancamentoFiltro.mes}`;
        }
        if(lancamentoFiltro.ano){
            urlComFiltros = `${urlComFiltros}&ano=${lancamentoFiltro.ano}`;
        }
        if(lancamentoFiltro.tipo){
            urlComFiltros = `${urlComFiltros}&tipoLancamento=${lancamentoFiltro.tipo}`;
        }
        if(lancamentoFiltro.descricao){
            urlComFiltros = `${urlComFiltros}&descricao=${lancamentoFiltro.descricao}`;
        }

        return this.get(urlComFiltros);
    }

    excluirLancamento(idLancamento){
        return this.delete(`/${idLancamento}`);
    }

    salvar(lancamento){
        return this.post("/", lancamento);
    }

    obterPorId(idLancamento){
        return this.get(`/${idLancamento}`);
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento);
    }

    alterarStatus(idLancamento, status){
        return this.put(`/${idLancamento}/atualiza-status`, {status});
    }

    validar(lancamento){
        console.log(lancamento.tipo);
        if(!lancamento.descricao){
            throw new ErroValidacao("A descrição é obrigatória");
        }
        if(!lancamento.ano){
            throw new ErroValidacao("O ano é obrigatório");
        }
        if(!lancamento.mes){
            throw new ErroValidacao("O mês é obrigatório");
        }
        if(!lancamento.valor){
            throw new ErroValidacao("O valor é obrigatório");
        }
        if(!lancamento.tipoLancamento){
            throw new ErroValidacao("O tipo é obrigatório");
        }
    }
}

export default LancamentoService;