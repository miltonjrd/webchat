import { useState, useContext } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

import { Eye, EyeSlash } from '@phosphor-icons/react';

import { ChatSocketContext } from 'src/context/chat-socket.context';
import UserContext from 'src/context/user.context';

const Form: FC = () => {
    const [{ identificator, password }, setForm] = useState<{ identificator: string, password: string }>({
        identificator: '',
        password: ''
    });
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const { setUser } = useContext(UserContext);

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const key = evt.target.name;
        const value = evt.target.value;

        setForm((state) => ({
            ...state,
            [key]: value
        }));
    };

    const handleFormSubmit = async (evt: FormEvent) => {
        evt.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth', {
                identificator,
                password
            });
            sessionStorage.setItem('access_token', response.data.access_token);
            toast.success(response.data.message);
            window.location.href = '/';
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
        
    };

    return (
        <form className="w-96" onSubmit={handleFormSubmit}>
            <h4 className='mb-6'>Faça login</h4>
            <div>
                <label htmlFor="identificator">
                    <small className='text-gray-700'>Nome de usuário ou email:</small>
                </label>
                <input 
                    id="identificator"
                    name="identificator"
                    type="text"
                    className='block w-full p-2 border rounded' 
                    value={identificator} 
                    onChange={handleInputChange}
                    autoComplete='off'
                />
            </div>
            <div className="mt-4">
                <label htmlFor="password">
                    <small className='text-gray-700'>Senha:</small>
                </label>
                <div className='flex w-full p-2 border rounded'>
                    <input 
                        id="password" 
                        name="password" 
                        type={isShowingPassword ? 'text' : 'password'} 
                        className='flex-grow'
                        value={password}
                        onChange={handleInputChange}
                    />
                    <button type="button" className='hover:bg-blue-50 text-blue-600 px-1 rounded-full' onClick={() => setIsShowingPassword(!isShowingPassword)}>
                        {
                            isShowingPassword ?
                            <EyeSlash color="currentColor" /> :
                            <Eye color="currentColor" />
                        }
                    </button>
                </div>
            </div>
            <div className='flex justify-end mt-6'>
                <button type="submit" className='bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-6 rounded-full'>Entrar</button>
            </div>
        </form>
    );
};

export default Form;