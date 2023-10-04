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

            await auth.authenticate(form.emailInput, form.passwordInput);

            navigate("/menu");
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
                    icon='mail'
                    required={true}
                    erro={errors.emailInput ? true : false} />
                <Input
                    name='passwordInput'
                    register={register}
                    type='password'
                    label='Senha'
                    icon='lock'
                    required={true}
                    erro={errors.passwordInput ? true : false} />
                <button
                    type="submit">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
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