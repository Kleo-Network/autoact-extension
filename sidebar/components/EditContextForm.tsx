import React from 'react';
import { ContextFormValues } from '../models/context.model';

interface EditContextFormProps {
    context: ContextFormValues;
    onChange: (name: keyof ContextFormValues, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const EditContextForm: React.FC<EditContextFormProps> = ({
    context,
    onChange,
    onSave,
    onCancel,
}) => {
    return (
        <div className="w-full flex flex-col gap-y-3">
            <input
                type="text"
                value={context.title}
                placeholder="Title"
                className="w-full bg-slate-100 border border-gray-200 p-2 rounded-lg focus:outline-none focus:border-2 focus:border-blue-600"
                onChange={(e) => onChange('title', e.target.value)}
            />
            <textarea
                value={context.description}
                placeholder="Description"
                rows={8}
                className="w-full bg-slate-100 border border-gray-200 p-2 rounded-lg focus:outline-none focus:border-2 focus:border-blue-600"
                onChange={(e) => onChange('description', e.target.value)}
            />
            <div className="btn-group flex justify-end gap-x-2">
                <button
                    className="w-fit bg-blue-600 text-white rounded-lg font-medium transition-colors duration-100 ease-linear px-4 py-2 hover:bg-blue-700"
                    onClick={onSave}
                >
                    Save
                </button>
                <button
                    className="w-fit bg-white text-blue-600 border border-blue-600 rounded-lg font-medium transition-colors duration-100 ease-linear px-4 py-2 hover:bg-slate-200"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditContextForm;
