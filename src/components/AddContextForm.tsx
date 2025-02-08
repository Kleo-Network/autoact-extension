import React from 'react';
import { ContextFormValues } from '../models/context.model';
import EditContextForm from './EditContextForm';

const AddContextForm: React.FC = () => {
    const [contextFormData, setContextFormData] =
        React.useState<ContextFormValues>({
            title: '',
            description: '',
        });

    const handleChange = (name: keyof ContextFormValues, value: string) => {
        setContextFormData({
            ...contextFormData,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Make an API call to add new context in DB
    };

    const handleCancel = () => {
        chrome.sidePanel.setOptions({ enabled: false });
        setContextFormData({
            title: '',
            description: '',
        });
    };

    return (
        <div className="p-4 text-base flex flex-col gap-y-4">
            <h1 className="text-2xl font-semibold">Add New Context</h1>
            <EditContextForm
                context={contextFormData}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default AddContextForm;
