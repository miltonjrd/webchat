import { useState, useContext } from 'react';
import type { FC } from 'react';

import LoginModal from './modules/LoginModal';
import RegisterModal from './modules/RegisterModal';

import UserContext from '../context/user.context';

const ChatAuth: FC = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    
    return (
        <div className='flex flex-grow justify-center items-center'>
            <div>
                <h4 className="leading-6">Para usar o webchat,<br />você precisa estar conectado.</h4>
                <div className="flex justify-between mt-6">
                    <button 
                        type="button" 
                        className="hover:bg-blue-50 active:bg-blue-100 text-blue-500 py-2 px-4 rounded-full transition-colors"
                        onClick={() => setShowRegisterModal(true)}
                    >
                        Criar uma conta
                    </button>
                    <button 
                        type="button" 
                        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600 text-white py-2 px-4 rounded-full transition-colors"
                        onClick={() => setShowLoginModal(true)}
                    >
                        Fazer login
                    </button>
                </div>
            </div>
            <LoginModal show={showLoginModal} close={() => setShowLoginModal(false)} />
            <RegisterModal show={showRegisterModal} close={() => setShowRegisterModal(false)} />
        </div>
    );
};

export default ChatAuth;