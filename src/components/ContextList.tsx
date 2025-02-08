import React from 'react';
import { ContextItem } from '../models/context.model';
import ContextItemComponent from './ContextItemComponent';

interface ContextListProps {
    contextItems: ContextItem[];
    onView: (item: ContextItem) => void;
}

const ContextList: React.FC<ContextListProps> = ({ contextItems, onView }) => (
    <div className="p-4 flex flex-col space-y-4">
        {contextItems.map((item) => (
            <ContextItemComponent
                key={item.id}
                item={item}
                onView={onView}
            />
        ))}
    </div>
);

export default ContextList;
