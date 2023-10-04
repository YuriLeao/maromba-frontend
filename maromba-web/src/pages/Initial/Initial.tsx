import './Initial.css'
import { Input } from '../../components/Input/Input'
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider/useAuth';
import { SnackBar } from '../../components/Snackbar/Snackbar';

export function User() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [errorApi, setErrorApi] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm();

   

    return (
        <>
            <div className="panel">
                <h1>MAROMBAPP</h1>
                
            </div>
        </>
    )
}