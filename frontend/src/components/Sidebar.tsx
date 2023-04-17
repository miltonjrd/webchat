import { useEffect, useState, useContext } from "react";
import type { FC } from "react";

import { ChatSocketContext } from "../context/chat-socket.context";

import IUser from "../utils/interfaces/user.interface";

type Props = {
    updateChattingWith(id: number): void
};

const Sidebar: FC<Props> = ({ updateChattingWith }) => {
    const [users, setUsers] = useState<IUser[]>([]);

    const chat = useContext(ChatSocketContext);
    
    useEffect(() => {
        chat.getUserList((users) => {
            setUsers(users);
        });
    }, []);

    return (
        <aside className="w-72 h-full border-r flex-shrink-0">
            <ul className="divide-y px-2">
                {users.map(({ id, name }) => (
                    <li key={id} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50" onClick={() => updateChattingWith(id)}>
                        <div className="h-12 w-12 bg-gray-200 rounded-full" />
                        <div>
                            {name}
                        </div>
                    </li>
                ))}
            </ul>
            
        </aside>
    );
};

export default Sidebar;