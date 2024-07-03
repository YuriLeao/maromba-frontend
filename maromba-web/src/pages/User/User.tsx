import './User.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/UseAuth';
import { Input } from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { cpfMask, phoneMask } from '../../Masks/mask';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import { Select } from '../../components/Select/Select';

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

    const companys = [
        { id: '1', name: 'P.H.D Sports' },
        { id: '9', name: 'Paulo Sports' },
        { id: '2', name: 'Iron Berg' },
        { id: '8', name: 'Iron Ferro' },
        { id: '3', name: 'Overall' },
        { id: '6', name: 'Overtudo' },
        { id: '7', name: 'Onada' },
        { id: '4', name: 'War gym' },
        { id: '5', name: 'Wally gym' },
        { id: '10', name: 'Wonka gym' },
    ];

    return (
        <>
            <div className="panel">
                <form
                    className="user-form"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h1>Cadastrar novo usuário</h1>
                    <Input
                        name='nameInput'
                        register={register}
                        type='input'
                        label='Nome'
                        onChange={onChange}
                        required={true}
                        error={errors.nameInput ? true : false} />
                    <Input
                        name='emailInput'
                        register={register}
                        type='email'
                        label='Email'
                        onChange={onChange}
                        required={true}
                        error={errors.emailInput ? true : false} />
                    <Input
                        name='phoneInput'
                        register={register}
                        type='phone'
                        label='Celular'
                        onChange={onChange}
                        required={true}
                        error={errors.phoneInput ? true : false} />
                    <Select
                        name='genderSelect'
                        register={register}
                        label='Gênero'
                        list={genders}
                        required={true}
                        error={errors.genderSelect ? true : false} />
                    <Input
                        name='weightInput'
                        register={register}
                        type='number'
                        label='Peso'
                        onChange={onChange}
                        required={true}
                        error={errors.weightInput ? true : false} />
                    <DatePicker
                        name='birthDatePicker'
                        control={control}
                        label='Data de nascimento'
                        required={true}
                        error={errors.birthDatePicker ? true : false} />
                    <Select
                        name='authorizationInput'
                        register={register}
                        label='Tipo de Usuário'
                        list={authorizations}
                        required={true}
                        error={errors.authorizationInput ? true : false} />
                    <AutoComplete
                        name='companyAutoComplete'
                        register={register}
                        label='Empresa'
                        list={companys}
                        required={true}
                        icon='search'
                        error={errors.companyAutoComplete ? true : false} />

                    <button
                        type="submit" className='mainButton'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}