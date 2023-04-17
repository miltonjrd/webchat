import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ChatSocketContext, chat } from './context/chat-socket.context';
import UserContext from './context/user.context';

import Sidebar from './components/Sidebar';
import MessagesView from './components/MessagesView';
import MessageSender from './components/MessageSender';
import ChatAuth from './components/ChatAuth';

import IUser from './utils/interfaces/user.interface';

import './App.css';
import request from './lib/request';

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [chattingWith, setChattingWith] = useState(-1);

  const updateChattingWith = (id: number) => {
    setChattingWith(id);
  };

  useEffect(() => {
    request({
      url: 'auth',
      method: 'GET'
    }).then((res) => setUser(res.data ?? null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ChatSocketContext.Provider value={chat}>
        <Toaster />
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-[1024px] h-[800px] flex bg-white rounded-xl overflow-hidden shadow-xl shadow-gray-200'>
            {
              !user ?
              <ChatAuth /> :
              <>
                <Sidebar updateChattingWith={updateChattingWith} />
                <div className='flex flex-grow flex-col'>
                  <header className='bg-white h-16 border-b'></header>
                  <MessagesView chattingWith={chattingWith} />
                  <MessageSender chattingWith={chattingWith} />
                </div>
              </>
            }
            
          </div>
        </div>
      </ChatSocketContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
