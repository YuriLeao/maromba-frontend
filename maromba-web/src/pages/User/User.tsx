import './User.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/UseAuth';
import { Input } from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import { Select } from '../../components/Select/Select';
import { DatePicker } from '../../components/DatePicker/DatePicker';

export function User() {
    const navigate = useNavigate();
    const auth = useAuth();

    const { register, handleSubmit, clearErrors, setValue, formState: { errors } } = useForm();

    const onSubmit = async (form: any) => {
        try {
            console.log(form)
        } catch (error) {

        }
    }

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
                        setValue={setValue}
                        clearErrors={clearErrors}
                        required={true}
                        error={errors.nameInput ? true : false} />
                    <Input
                        name='cpfInput'
                        register={register}
                        type='cpf'
                        label='CPF'
                        setValue={setValue}
                        clearErrors={clearErrors}
                        required={true}
                        error={errors.cpfInput ? true : false} />
                    <Input
                        name='emailInput'
                        register={register}
                        type='email'
                        label='Email'
                        setValue={setValue}
                        clearErrors={clearErrors}
                        required={true}
                        error={errors.emailInput ? true : false} />
                    <Input
                        name='phoneInput'
                        register={register}
                        type='phone'
                        label='Celular'
                        setValue={setValue}
                        clearErrors={clearErrors}
                        required={true}
                        error={errors.phoneInput ? true : false} />
                    <Select
                        name='genderSelect'
                        register={register}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        label='Gênero'
                        list={genders}
                        required={true}
                        error={errors.genderSelect ? true : false} />
                    <Input
                        name='weightInput'
                        register={register}
                        type='number'
                        label='Peso'
                        setValue={setValue}
                        clearErrors={clearErrors}
                        required={true}
                        error={errors.weightInput ? true : false} />
                    <DatePicker
                        name='birthDatePickerTeste'
                        register={register}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        label='Data de nascimento'
                        required={true}
                        error={errors.birthDatePickerTeste ? true : false} />
                    <Select
                        name='authorizationInput'
                        register={register}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        label='Tipo de Usuário'
                        list={authorizations}
                        required={true}
                        error={errors.authorizationInput ? true : false} />
                    <AutoComplete
                        name='companyAutoComplete'
                        register={register}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        label='Empresa'
                        list={companys}
                        required={true}
                        icon='search'
                        error={errors.companyAutoComplete ? true : false} />

                    <button
                        type="submit" className='main-button'>
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}