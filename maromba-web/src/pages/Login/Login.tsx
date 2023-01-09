import './Login.css'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/useAuth';
import { SnackBar } from '../../components/Snackbar/Snackbar';

export function Login() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [errorApi, setErrorApi] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm();

    const snackbarRef = useRef(null);

    const onSubmit = async (form: any) => {
        try {

            await auth.authenticate(form.emailInput, form.senhaInput);

            navigate("/inicial");
        } catch (error) {
            setErrorApi(error as string);
            if (snackbarRef.current) {
                snackbarRef.current.show();
            }
        }
    }

    return (
        <div className="login">
            <h1>MAROMBAPP</h1>
            <h3>Login</h3>
            <form
                className="login-form"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name='emailInput'
                    register={register}
                    type='email'
                    label='Email'
                    icon='mail' />
                {errors.emailInput &&
                    <span style={{ color: "red" }}>
                        Campo de e-mail obrigatório.
                    </span>}
                <Input
                    name='senhaInput'
                    register={register}
                    type='password'
                    label='Senha'
                    icon='lock' />
                {errors.senhaInput &&
                    <span style={{ color: "red" }}
                    >Campo de senha obrigatório.
                    </span>}
                <button
                    type="submit">
                    LOGIN
                </button>
                <a
                    href="https://website.com">
                    Forgot your credentials?
                </a>
            </form>
            <SnackBar
                ref={snackbarRef}
                message={errorApi}
                type="error" />
        </div>
    )
}