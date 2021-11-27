import React from 'react';

import Card from '../../componentes/card/card';
import FormGroup from '../../componentes/formgroup/form-group';
import UsuarioService from '../../service/usuarioService';

import { Button } from 'primereact/button';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        mensagemErro: null
    };

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    cadastrar = () => {
        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            confirmarSenha: this.state.confirmarSenha
        };

        try {
            this.usuarioService.validarFormulario(usuario);

            this.usuarioService.cadastrar(usuario)
                .then(response => {
                    this.props.history.push('/login');
                })
                .catch(erro => {
                    this.setState({ mensagemErro: erro.response.data });
                }
            );

        } catch (error) {
            this.setState({ mensagemErro: error.mensagem });
            return false;
        }
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">

                {/* valida os campos do formulário */}
                {this.state.mensagemErro != null ? <div className="alert alert-dismissible alert-warning text-center"><strong>{this.state.mensagemErro}</strong></div> : null}

                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    className="form-control"
                                    id="inputNome"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} 
                                    autoComplete="off"/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} 
                                    autoComplete="off"/>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputSenha"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })} 
                                    autoComplete="off"/>
                            </FormGroup>
                            <FormGroup label="Confirmar Senha: *" htmlFor="inputConfirmarSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputConfirmarSenha"
                                    name="confirmarSenha"
                                    onChange={e => this.setState({ confirmarSenha: e.target.value })} 
                                    autoComplete="off"/>
                            </FormGroup>
                            <br />

                            <Button onClick={this.cadastrar} label="Cadastrar" className="p-button-rounded p-button-success" />
                            <Button onClick={this.cancelar} label="Cancelar" className="p-button-rounded p-button-danger" />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default CadastroUsuario;