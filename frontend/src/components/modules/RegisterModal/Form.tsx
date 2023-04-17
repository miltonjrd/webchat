import { useState, useContext } from 'react';
import type { FC, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

import { Eye, EyeSlash } from '@phosphor-icons/react';

import { ChatSocketContext } from 'src/context/chat-socket.context';

const Form: FC = () => {
    const [{ username, password, email }, setForm] = useState<{ username: string, email: string, password: string }>({
        username: '',
        email: '',
        password: ''
    });
    const [isShowingPassword, setIsShowingPassword] = useState(false);

    const chat = useContext(ChatSocketContext);

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const key = evt.target.name;
        const value = evt.target.value;

        setForm((state) => ({
            ...state,
            [key]: value
        }))
    };

    const handleFormSubmit  = async (evt: FormEvent) => {
        evt.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/users', {
                name: username,
                email, 
                password
            });
            toast.success(response.data.message);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    };

    return (
        <form className="w-96" onSubmit={handleFormSubmit}>
            <h4 className='mb-6'>Faça sua conta</h4>
            <div>
                <label htmlFor='username'>
                    <small>Nome de usuário:</small>
                </label>
                <input 
                    id="username"
                    name="username"
                    type="text"
                    className='block w-full p-2 border rounded' 
                    value={username} 
                    onChange={handleInputChange}
                    autoComplete='off'
                />
            </div>
            <div className="mt-4">
                <label htmlFor='email'>
                    <small>Email:</small>
                </label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    className='block w-full p-2 border rounded' 
                    value={email} 
                    onChange={handleInputChange}
                    autoComplete='off'
                />
            </div>
            <div className="mt-4">
                <label htmlFor="password">
                    <small>Senha:</small>
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
                <button type="submit" className='bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-6 rounded-full'>Criar cadastro</button>
            </div>
        </form>
    );
};

export default Form;