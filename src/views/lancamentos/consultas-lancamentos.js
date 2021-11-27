import React from 'react';
import { withRouter } from "react-router-dom";
import Card from '../../componentes/card/card';
import FormGroup from '../../componentes/formgroup/form-group';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../service/lancamentoService';
import LocalStorageService from '../../service/localStorageService';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import '../../custom.css';

class ConsultaLancamentos extends React.Component {
    state = {
        ano: "",
        mes: "",
        tipoLancamento: "",
        idUsuario: "",
        descricao: "",
        mensagemAcaoLancamento: null,
        lancamentos: [],
        showConfirmDialog: false,
        lancamentoSelecionado: null
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscarLancamentosFiltro = () => {
        const idUsuario = LocalStorageService.obterItem("usuario_logado").id;

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipoLancamento,
            descricao: this.state.descricao,
            idUsuario: idUsuario
        }

        this.service.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    editarLancamento = (id) => {
        this.props.history.push(`/cadastrar-lancamentos/${id}`);
    }

    abrirConfirmacaoExclusao = (lancamento) => {
        this.setState({
            showConfirmDialog: true,
            lancamentoSelecionado: lancamento
        });
    }

    cancelarExclusao = () => {
        this.setState({
            showConfirmDialog: false,
            lancamentoSelecionado: null
        });
    }

    excluirLancamento = () => {
        this.service.excluirLancamento(this.state.lancamentoSelecionado.id)
            .then(response => {
                //se a exclusão for bem sucedida, remove o lançamento da lista
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoSelecionado);
                lancamentos.splice(index, 1);
                this.setState({
                    lancamentos: lancamentos,
                    mensagemAcaoLancamento: "Lancamento excluído com sucesso.",
                    showConfirmDialog: false,
                });
            })
            .catch(error => {
                this.setState({ mensagemAcaoLancamento: "Erro ao excluir o lançamento " + error });
            });
    }

    cadastrarLancamento = () => {
        this.props.history.push("/cadastrar-lancamentos");
    }

    alterarStatusLancamento = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
            .then(response => {
                //atualiza a lista de lançamentos com o novo status
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;
                    this.setState(lancamentos);
                }

                //mostra mensagem de sucesso
                this.setState({ mensagemAcaoLancamento: "Status do lançamento alterado com sucesso." });

                //busco novamente os lançamentos para atualizar o status
                this.buscarLancamentosFiltro();
            })
            .catch(error => {
                this.setState({ mensagemAcaoLancamento: "Erro ao alterar o status do lançamento " + error.response });
            });
    }


    render() {
        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.excluirLancamento}/>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarExclusao} className="p-button-secondary" />
            </div>
        );

        return (
            <div>
                <Card title="Buscar Lançamentos">
                    {this.state.mensagemAcaoLancamento != null
                        ?
                        <div className="alert alert-dismissible alert-info" ><strong > {this.state.mensagemAcaoLancamento} </strong></div >
                        :
                        null
                    }
                    <div className="row">
                        <div className="col-md-3">
                            <div className="bs-component">
                                <FormGroup htmlFor="inputAno" label="Ano">
                                    <input type="text"
                                        className="form-control"
                                        id="inputAno"
                                        value={this.state.ano}
                                        onChange={(e) => this.setState({ ano: e.target.value })}
                                        name="ano"
                                    />
                                </FormGroup>
                                <br />
                                <FormGroup htmlFor="inputDescricao" label="Descrição">
                                    <input type="text"
                                        className="form-control"
                                        id="inputDescricao"
                                        value={this.state.descricao}
                                        onChange={(e) => this.setState({ descricao: e.target.value })}
                                        name="descricao"
                                    />
                                </FormGroup>
                                <br />
                                <FormGroup htmlFor="inputMes" label="Mês">
                                    <select className="form-control"
                                        id="inputTipoLancamento"
                                        name="tipoLancamento"
                                        value={this.state.mes}
                                        onChange={(e) => this.setState({ mes: e.target.value })}>

                                        <option value="" > Selecione </option>
                                        <option value="1" > Janeiro </option>
                                        <option value="2" > Fevereiro </option>
                                        <option value="3" > Março </option>
                                        <option value="4" > Abril </option>
                                        <option value="5" > Maio </option>
                                        <option value="6" > Junho </option>
                                        <option value="7" > Julho </option>
                                        <option value="8" > Agosto </option>
                                        <option value="9" > Setembro </option>
                                        <option value="10" > Outubro </option>
                                        <option value="11" > Novembro </option>
                                        <option value="12" > Dezembro </option>
                                    </select>
                                </FormGroup>
                                <br />
                                <FormGroup htmlFor="inputTipoLancamento" label="TipoLancamento">
                                    <select className="form-control"
                                        id="inputTipoLancamento"
                                        name="tipoLancamento"
                                        value={this.state.tipoLancamento}
                                        onChange={(e) => this.setState({ tipoLancamento: e.target.value })}>

                                        <option value="" > Selecione </option>
                                        <option value="RECEITA" > RECEITA </option>
                                        <option value="DESPESA" > DESPESA </option>
                                    </select>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <Button onClick={this.buscarLancamentosFiltro} label="Buscar" className="p-button-rounded p-button-success" />
                            <Button onClick={this.cadastrarLancamento} label="Cadastrar" className="p-button-rounded p-button-warning" />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bs-component">
                                <LancamentosTable lancamentos={this.state.lancamentos}
                                    editarLancamento={this.editarLancamento}
                                    excluirLancamento={this.abrirConfirmacaoExclusao}
                                    alterarStatusLancamento={this.alterarStatusLancamento}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Dialog header="Alerta de Confirmação"
                            visible={this.state.showConfirmDialog}
                            style={{ width: '50vw' }}
                            footer={confirmDialogFooter}
                            modal={true}
                            onHide={() => this.setState({ showConfirmDialog: false })}>
                            Deseja realmente excluir o lançamento ?
                        </Dialog>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withRouter(ConsultaLancamentos);