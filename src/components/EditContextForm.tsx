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
                id="title"
                type="text"
                value={context.title}
                placeholder="Title"
                className="input-box"
                onChange={(e) => onChange('title', e.target.value)}
            />
            <textarea
                id="description"
                value={context.description}
                placeholder="Description"
                rows={8}
                className="input-box"
                onChange={(e) => onChange('description', e.target.value)}
            />
            <div className="btn-group flex justify-end gap-x-3">
                <button
                    className="btn-primary"
                    onClick={onSave}
                >
                    Save
                </button>
                <button
                    className="btn-secondary"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditContextForm;
