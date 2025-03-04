import React, { useContext } from 'react';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { ContextsContext } from '../contexts/ContextsContext';
import { ContextItem } from '../models/context.model';

interface ContextItemProps {
    item: ContextItem;
    onView: (item: ContextItem) => void;
}

const ContextItemComponent: React.FC<ContextItemProps> = ({ item, onView }) => {
    const { deleteContext } = useContext(ContextsContext);

    return (
        <div
            className="bg-white rounded-lg text-black p-4 flex flex-col transition-all delay-75 duration-150 ease-linear hover:cursor-pointer hover:scale-105 hover:shadow-sm"
            onClick={() => onView(item)}
        >
            <div className="flex justify-between items-center">
                <h1 className="text-base font-semibold">{item.title}</h1>
                <button
                    className="icon-btn cursor-pointer hover:bg-[#fafafa]"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteContext(item.id);
                        chrome.runtime.sendMessage({
                            action: 'informModalToRefetchContexts',
                        });
                    }}
                    title="Delete"
                >
                    <BiSolidTrashAlt
                        size={16}
                        color="#2563eb"
                    />
                </button>
            </div>
            <p className="text-sm line-clamp-2 mt-2">{item.description}</p>
            <button className="text-blue-600 font-bold w-fit mt-4 transition-all delay-75 duration-150 ease-linear hover:underline hover:underline-offset-4">
                View More
            </button>
        </div>
    );
};

export default ContextItemComponent;
