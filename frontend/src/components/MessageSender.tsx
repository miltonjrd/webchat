import { useContext, useRef } from 'react';
import type { FC, FormEvent } from 'react';

import { PaperPlaneTilt } from '@phosphor-icons/react';

import { ChatSocketContext } from '../context/chat-socket.context';

type Props = {
    chattingWith: number;
};

const MessageSender: FC<Props> = ({ chattingWith }) => {
    const messageInputRef = useRef<HTMLDivElement>(null);

    const chat = useContext(ChatSocketContext);

    const handleMessageSend = (evt: FormEvent) => {
        evt.preventDefault();

        const text = messageInputRef.current?.innerText!;
        chat.sendMessage({ text, addresseeId: chattingWith });
    };

    console.log('remetente:', chattingWith)

    return (
        <form className='flex min-h-16 bg-white border-t px-6 py-2' onSubmit={handleMessageSend}>
            <div ref={messageInputRef} className="flex-grow border rounded-l-md p-2 focus:border-gray-300" contentEditable />
            <button type="submit" className='bg-blue-400 px-4 rounded-r-md hover:bg-blue-500'>
                <PaperPlaneTilt size={24} color="#fff" weight="light" />
            </button>
        </form>
    );
};

export default MessageSender;