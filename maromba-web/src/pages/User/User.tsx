import './User.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/useAuth';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { useForm } from 'react-hook-form';
import { cpfMask, phoneMask } from '../../Masks/mask';
import { DatePicker } from '../../components/DatePicker/DatePicker';

export function User() {
    const navigate = useNavigate();
    const auth = useAuth();

    const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

    const onSubmit = async (form: any) => {
        try {
            console.log(form)
        } catch (error) {

        }
    }

    const onChange = ((e: any, name: string, type: string) => {

        var value = e.target.value;
        if (type === 'phone') {
            value = phoneMask(value);
        } else if (type === 'cpf') {
            value = cpfMask(value);
        }

        setValue(name, value);
    });

    const genders = [
        { id: 'M', name: 'Monstro' },
        { id: 'F', name: 'Monstra' },
        { id: 'O', name: 'Saiu de jaula' },
    ];

    const authorizations = [
        { id: 'admin', name: 'Admin' },
        { id: 'empresa', name: 'Empresa' },
        { id: 'professor', name: 'Professor' },
        { id: 'aluno', name: 'Aluno' },
    ];

    return (
        <>
            <div className="panel">
                <form
                    className="user-form"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='mt20'>Crie seu usuário</h1>
                    <Input
                        name='nameInput'
                        register={register}
                        type='input'
                        label='Nome'
                        onChange={onChange}
                        required={true}
                        erro={errors.nameInput ? true : false} />
                    <Input
                        name='emailInput'
                        register={register}
                        type='email'
                        label='Email'
                        onChange={onChange}
                        required={true}
                        erro={errors.emailInput ? true : false} />
                    <Input
                        name='phoneInput'
                        register={register}
                        type='phone'
                        label='Celular'
                        onChange={onChange}
                        required={true}
                        erro={errors.phoneInput ? true : false} />
                    <Select
                        name='genderInput'
                        register={register}
                        label='Gênero'
                        list={genders}
                        required={true}
                        erro={errors.genderInput ? true : false} />
                    <Input
                        name='weightInput'
                        register={register}
                        type='number'
                        label='Peso'
                        onChange={onChange}
                        required={true}
                        erro={errors.weightInput ? true : false} />
                    <DatePicker
                        name='birthDatePicker'
                        control={control}
                        label='Data de nascimento'
                        required={true}
                        erro={errors.birthDatePicker ? true : false} />
                    <Select
                        name='authorizationInput'
                        register={register}
                        label='Tipo de Usuário'
                        list={authorizations}
                        required={true}
                        erro={errors.authorizationInput ? true : false} />
                    

                    <button 
                        type="submit" className='confirmButton mb20'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}