import React from 'react';
import NoSavedContext from '../assets/no_saved_contexts.svg';
import { ContextItem } from '../models/context.model';
import ContextItemComponent from './ContextItemComponent';

interface ContextListProps {
    contextItems: ContextItem[];
    onView: (item: ContextItem) => void;
}

const ContextList: React.FC<ContextListProps> = ({ contextItems, onView }) => {
    if (contextItems.length === 0) {
        return (
            <div className="px-6 py-4 flex flex-col justify-center items-center bg-[#fafafa] flex-1">
                <img
                    src={NoSavedContext}
                    alt="No Saved Context"
                    width="80%"
                />
                <h3 className="text-lg font-semibold mt-6 text-center">
                    No Saved Contexts
                </h3>
                <p className="text-sm text-[#667085] mt-2 text-center">
                    You have not saved any context in your knowledgebase yet.
                    Click on "New" button at top to get started!
                </p>
            </div>
        );
    }

    return (
        <div className="px-6 py-4 flex flex-col space-y-4 bg-[#fafafa] flex-1 overflow-auto">
            {contextItems.map((item) => (
                <ContextItemComponent
                    key={item.id}
                    item={item}
                    onView={onView}
                />
            ))}
        </div>
    );
};

export default ContextList;
