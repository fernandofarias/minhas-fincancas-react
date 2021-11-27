import ErroValidacao from "../exception/erroValidacao";
import ApiService from "./apiservice";

class UsuarioService extends ApiService {
    constructor() {
        super("/api/usuarios");
    }
    
    autenticar(credenciais) {
        return this.post("/autenticar", credenciais);
    }

    obterSaldo(id) {
        return this.get(`/${id}/saldo`);
    }

    cadastrar(usuario) {
        return this.post("/", usuario);
    }

    validarFormulario(usuario) {
        console.log(usuario);
        if (usuario.nome === '') {
            throw new ErroValidacao('Nome é obrigatório');
        }

        if (usuario.email === '') {
            throw new ErroValidacao('Email é obrigatório' );
        }

        if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            throw new ErroValidacao('Email inválido');
        }

        if (usuario.senha === '') {
            throw new ErroValidacao('Senha é obrigatório' );
        }

        if (usuario.confirmarSenha === '') {
            throw new ErroValidacao('Confirmar senha é obrigatório' );
        }

        if (usuario.senha !== usuario.confirmarSenha) {
            throw new ErroValidacao('Senhas não conferem');
        }
    }
}

export default UsuarioService;