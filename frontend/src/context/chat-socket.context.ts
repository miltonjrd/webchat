import { createContext } from 'react';
import io from 'socket.io-client';
import ChatSocket from '../lib/chat-socket';

const socket = io('http://localhost:5000', { autoConnect: false, auth: { token: sessionStorage.getItem('access_token') } });
export const chat = new ChatSocket(socket);
export const ChatSocketContext = createContext(chat);