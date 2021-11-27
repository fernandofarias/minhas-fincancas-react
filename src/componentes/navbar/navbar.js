import React from 'react';

import NavbarItem from '../navbarItem/navbarItem';
import { AuthConsumer } from '../../main/provedorAutenticacao';

function Navbar(props) {
    return (
        <div className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/home" label="Home" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="#/consultar-lancamentos" label="Lançamentos" />
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    );
}
// a linha abaixo é só pra sumir o warning do react
//eslint-disable-next-line 
export default () => (
    <AuthConsumer>
        {(context) => (
            <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
        )}
    </AuthConsumer>
);