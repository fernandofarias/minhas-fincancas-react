import React from 'react';
import UsuarioService from '../service/usuarioService';
import { AuthContext } from '../main/provedorAutenticacao';

import { Card } from 'primereact/card';

class Home extends React.Component {

    state = { 
        saldo : 0
     }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    } 

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado;

        this.usuarioService.obterSaldo(usuarioLogado.id)
             .then(response => {
                 this.setState({ saldo : response.data })
             }).catch(erro => {
                    console.log(erro.response);
                });
    }

    render() { 
        return (
            <div>
                <Card title="Simple Card" > 
                    <h1 className="display-3"> Bem Vindo!</h1>
                    <p className="lead">Este é o seu sistema de finanças.</p>
                    <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}.</p>
                    <hr className="my-4" />
                    <p>Para começar, cadastre suas contas.</p>
                    <p className="lead">
                        <a className="btn btn-warning" href="#/cadastro-usuarios" role="button"><i className="fas fa-user-plus"></i>Cadastrar Usuário</a>
                        <a className="btn btn-info" href="#/cadastrar-lancamentos" role="button">Cadastrar Lançamento</a>
                    </p>
                </Card>
            </div>
        );
    }
}
 
Home.contextType = AuthContext;

export default Home;