import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import IUser from '../utils/interfaces/user.interface';

type ContextType = {
    user: IUser | null,
    setUser: Dispatch<SetStateAction<IUser | null>>
};

const UserContext = createContext<ContextType>({
    user: null,
    setUser: () => null
});

export default UserContext;