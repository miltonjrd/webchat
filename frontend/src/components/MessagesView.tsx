import { useEffect, useState, useContext } from "react";
import type { FC } from "react";

import Message from "./Message";

import IMessage from "src/utils/interfaces/message.interface";

import { ChatSocketContext } from "src/context/chat-socket.context";

type Props = {
    chattingWith: number
};

const MessagesView: FC<Props> = ({ chattingWith }) => {
    const [messages, setMessages] = useState<IMessage[]>();

    const chat = useContext(ChatSocketContext);

    useEffect(() => {
        chat.getMessagesWithUser(chattingWith, (messages) => {
            console.log(messages)
            setMessages(messages);
        });
    }, [chattingWith]);

    return (
        <div className='flex-grow m-4'>
            {messages?.map(({ id, ...message }) => (
                <Message key={id} {...message} />
            ))}
        </div>
    );
};

export default MessagesView;