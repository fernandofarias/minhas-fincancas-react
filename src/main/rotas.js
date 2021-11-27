import React from 'react';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/usuarios/cadastroUsuario';
import Home from '../views/home';
import consultasLancamentos from '../views/lancamentos/consultas-lancamentos';
import cadastroLancamentos from '../views/lancamentos/cadastro-lancamentos';
import { AuthConsumer } from './provedorAutenticacao';

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={ (componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{pathname: '/login', state : {from: componentProps.location}}} />
                )
            }
        }} />
    );
}

function Rotas(props) {
    return ( 
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />   
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultar-lancamentos" component={consultasLancamentos} />
                
                {/* A '?' após o 'id' significa que o parametro 'id' é opcional, isso faz com que a tela seja carregada caso o parametro não seja informado */}
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastrar-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch>
        </HashRouter>            
     );
}

// a linha abaixo é só pra sumir o warning do react
//eslint-disable-next-line 
export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>    
);