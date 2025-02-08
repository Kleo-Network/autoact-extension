import React from 'react';
import { ContextItem } from '../models/context.model';

interface ContextItemProps {
    item: ContextItem;
    onView: (item: ContextItem) => void;
}

const ContextItemComponent: React.FC<ContextItemProps> = ({ item, onView }) => (
    <div className="border border-gray-200 rounded-lg flex justify-between items-center p-4">
        <h1 className="text-base font-medium">{item.title}</h1>
        <button
            className="text-blue-600 text-sm hover:underline hover:underline-offset-4"
            onClick={() => onView(item)}
        >
            VIEW
        </button>
    </div>
);

export default ContextItemComponent;
