import type { FC } from 'react';

import Form from "./Form";
import { Dialog } from '@headlessui/react';

import { X } from '@phosphor-icons/react';

type Props = {
    show: boolean,
    close(): void
};

const RegisterModal: FC<Props> = ({ show, close }) => {
    return (
        <Dialog open={show} onClose={close}>
            <div className="fixed inset-0 flex justify-center items-start bg-gray-800/10 backdrop-blur-sm">
                <Dialog.Panel className="bg-white p-4 rounded-md mt-64 flex-grow-0">
                    <div className='flex justify-end'>
                        <button type="button" className='hover:bg-blue-50 text-gray-600 hover:text-blue-600 p-1 rounded-full' onClick={close}>
                            <X size={20} />
                        </button>
                    </div>
                    <Form />
                </Dialog.Panel>
            </div>
            
        </Dialog>
    );
};

export default RegisterModal;