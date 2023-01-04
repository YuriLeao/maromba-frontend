
import '../assets/styles/Login.css'
import { Input } from '../components/Input';
import { useFetch } from '../hook/UseFetch';

type Usuario = {
    id: string;
    email: string;
    senha: string;
    nome: string;
    genero: string;
    telefone: string;
    peso: number;
    autorizacoes: string[];
    empresaId: string;
    empresaNome: string;
    token: string;
}

function logar(){
    const { data, error, isFetching } = useFetch<Usuario>('usuario-service/login/ydomingosleao@gmail.com/1235');
    console.log(data);
    console.log(error);
    console.log(isFetching);
}

export function Login() {
    return (
        <div className="login">
            <h1>MAROMBA</h1>
            <h3>Login</h3>


            <form className="login-form">
                <Input id='emailInput' type='email' label='Email' icon='mail' />
                <Input id='senhaInput' type='password' label='Senha' icon='lock' />
                <button type="submit" onClick={logar}>LOGIN</button>
                <a href="https://website.com">Forgot your credentials?</a>
            </form>
        </div>
    )
}