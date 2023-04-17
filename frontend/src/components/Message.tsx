import { FC } from "react";

type Props = {
    received?: boolean,
    text: string
};

const Message: FC<Props> = ({ received, text }) => {
    return (
        <div className={`flex ${received ? 'justify-start' : 'justify-end'} py-2`}>
            <div className={`p-2 ${received ? 'bg-gray-200' : 'bg-gray-100'} rounded-md max-w-[400px]`}>
                <p className="line-clamp-5 leading-5">{text}</p>
            </div>
        </div>
    );
};

export default Message;