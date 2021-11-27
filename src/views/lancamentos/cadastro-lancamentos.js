import React from 'react';

import Card from '../../componentes/card/card';
import FormGroup from '../../componentes/formgroup/form-group';

import { Button } from 'primereact/button';
import { withRouter } from "react-router-dom";

import LancamentoService from '../../service/lancamentoService';
import LocalStorageService from '../../service/localStorageService';

class CadastroLancamentos extends React.Component {

    state = {
        usuario: "",
        descricao: "",
        valor: "",
        mes: "",
        ano: "",
        tipoLancamento: "",
        status: "",
        mensagemSalvarLancamento: null,
        isAtualizar: false
    }

    constructor(){
        super();
        this.LancamentoService = new LancamentoService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }    

    cadastrarLancamento = () => {
        const lancamento = {
            usuario: LocalStorageService.obterItem("usuario_logado").id,
            descricao: this.state.descricao,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            tipoLancamento: this.state.tipoLancamento
        }

        try {
           this.LancamentoService.validar(lancamento);

           this.LancamentoService.salvar(lancamento)
            .then(response => {
                this.props.history.push("/consultar-lancamentos");
            })
            .catch(error => {
                this.setState({mensagemSalvarLancamento: error.response.data});
            });

        } catch (erro) {
            console.log(erro.mensagem);
            this.setState({mensagemSalvarLancamento: erro.mensagem});
            return false;
        }
    }

    cancelarCadastro = () => {
        this.props.history.push("/consultar-lancamentos");
    }

    //antes de entrar na tela de cadastro / atualizar carrega os dados do lancamento
    componentDidMount(){
        const IdLancamentoEditar = this.props.match.params.id;
        if(IdLancamentoEditar){
            
            this.setState({isAtualizar: true});

            this.LancamentoService.obterPorId(IdLancamentoEditar)
                .then(response => {
                    this.setState({
                        usuario: response.data.usuario.id,
                        descricao: response.data.descricao,
                        valor: response.data.valor,
                        mes: response.data.mes,
                        ano: response.data.ano,
                        tipoLancamento: response.data.tipoLancamento,
                        status: response.data.statusLancamento
                    });
                })
                .catch(error => {
                    console.log(error.response);
                }
            );
        }
    }

    atualizarLancamento = () => {
        const lancamento = {
            id: this.props.match.params.id,
            usuario: LocalStorageService.obterItem("usuario_logado").id,
            descricao: this.state.descricao,
            valor: this.state.valor,
            mes: this.state.mes,
            ano: this.state.ano,
            tipoLancamento: this.state.tipoLancamento
        }

        this.LancamentoService.atualizar(lancamento)
            .then(response => {
                this.props.history.push("/consultar-lancamentos");
            })
            .catch(error => {
                this.setState({mensagemSalvarLancamento: error.response.data});
            });
    }

    render() { 
        return (
            <div>
                <Card title={this.state.isAtualizar? "Atualização de Lançamento" : "Cadastro de Lançamento"}>
                {this.state.mensagemSalvarLancamento != null ? <div className="alert alert-dismissible alert-warning">{this.state.mensagemSalvarLancamento}</div> : null}
    
                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup id="inputDescricao" label="Descrição: *">
                                <input id="inputDescricao"
                                    type="text"
                                    className="form-control"
                                    name="descricao"
                                    placeholder="Informe a Descrição"
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                    autoComplete="off"/>
                            </FormGroup>
                        </div>
                    </div>    
                    <br/>
                    <div className="row">
                        <div className="col-md-3">
                            <FormGroup id="inputAno" label="Ano: *">
                                <input id="inputAno"
                                    type="number"
                                    className="form-control"
                                    name="ano"
                                    placeholder="Informe o Ano"
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    autoComplete="off"/>
                            </FormGroup>    
                        </div>
                        <div className="col-md-3">
                            <FormGroup id="inputMes" label="Mes: *">
                                <select id="inputMes" className="form-control" name="mes" value={this.state.mes} onChange={this.handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="1">Janeiro</option>
                                    <option value="2">Fevereiro</option>
                                    <option value="3">Março</option>
                                    <option value="4">Abril</option>
                                    <option value="5">Maio</option>
                                    <option value="6">Junho</option>
                                    <option value="7">Julho</option>
                                    <option value="8">Agosto</option>
                                    <option value="9">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </FormGroup>    
                        </div>
                    </div> 
                    <br/>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup id="inputValor" label="Valor: *">
                                <input id="inputValor" 
                                    type="number"
                                    className="form-control"
                                    name="valor"
                                    placeholder="Informe o Valor"
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    autoComplete="off"/>
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup id="inputTipo" label="Tipo: *">
                                <select id="inputTipoLancamento" className="form-control" name="tipoLancamento" value={this.state.tipoLancamento} onChange={this.handleChange}>
                                    <option value="">Selecione</option>
                                    <option value="RECEITA">RECEITA</option>
                                    <option value="DESPESA">DESPESA</option>
                                </select>
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup id="inputStatus" label="Status: *">
                                <input id="inputStatus" type="text" className="form-control" name="inputStatus" disabled={true} value={this.state.status}/>
                            </FormGroup>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            {this.state.isAtualizar 
                                ? 
                                <Button onClick={this.atualizarLancamento} label="Atualizar" className="p-button-rounded p-button-primary" />
                                :
                                <Button onClick={this.cadastrarLancamento} label="Salvar" className="p-button-rounded p-button-success" />
                            }
                            <Button onClick={this.cancelarCadastro} label="Cancelar" className="p-button-rounded p-button-danger" />
                        </div>   
                    </div>                       
                </Card>            
            </div>    
        )
    }
}
 
export default withRouter(CadastroLancamentos);