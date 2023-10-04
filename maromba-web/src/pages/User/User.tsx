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

    return (
        <>
            <div className="panel">
                <h1>Seu perfil</h1>
                <form
                    className="user-form"
                    onSubmit={handleSubmit(onSubmit)}>
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

                    <button
                        type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        LOGIN
                    </button>
                </form>
            </div>
        </>
    )
}