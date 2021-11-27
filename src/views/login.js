import React from "react";
import Card from "../componentes/card/card";
import FormGroup from "../componentes/formgroup/form-group";
import { withRouter } from "react-router-dom";

import UsuarioService from "../service/usuarioService";

import { Button } from 'primereact/button';

import { AuthContext } from "../main/provedorAutenticacao";

class Login extends React.Component {

    state = {
        email: "",
        senha: "",
        mensagemErro: null
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    entrar = () => {
        this.usuarioService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.setState({ mensagemErro: null });
            this.context.iniciarSessao(response.data);
            this.props.history.push("/home");
        }).catch(erro => {
            this.setState({ mensagemErro: erro.response.data });
        });
    }

    prepararParaCadastro = () => {
        this.props.history.push("/cadastro-usuarios");
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login" color="primary">

                            {/* se o existir valor na mensagem de erro mostro o card com a mensagem de erro */}
                            { this.state.mensagemErro != null ? <div className="alert alert-danger" role="alert">{this.state.mensagemErro}</div> : null}

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                                <input type="email"
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    placeholder="Informe o Email"
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })} 
                                                    autoComplete="off"/>
                                            </FormGroup>
                                            <br />
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Informe a Senha"
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })} 
                                                    autoComplete="off"/>
                                            </FormGroup>
                                            <br />
                                            <Button onClick={this.entrar} label="Entrar" className="p-button-rounded p-button-success" />
                                            <Button onClick={this.prepararParaCadastro} label="Cadastrar" className="p-button-rounded p-button-warning" />

                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);