import React, { useContext, useEffect } from 'react';
import { ContextsContext } from '../contexts/ContextsContext';
import { ContextFormValues } from '../models/context.model';
import EditContextForm from './EditContextForm';

interface AddContextFormProps {
    onSaved: () => void;
}

const AddContextForm: React.FC<AddContextFormProps> = ({ onSaved }) => {
    const [contextFormData, setContextFormData] =
            React.useState<ContextFormValues>({
                title: '',
                description: '',
            }),
        { addNewContext } = useContext(ContextsContext);

    useEffect(() => {
        chrome.runtime.sendMessage(
            { action: 'getPageData' },
            (response: { pageData: ContextFormValues } | undefined) => {
                if (response) {
                    setContextFormData(response.pageData);
                }
            },
        );
    }, []);

    const handleChange = (name: keyof ContextFormValues, value: string) => {
        setContextFormData({
            ...contextFormData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        if (
            contextFormData.title.trim() === '' ||
            contextFormData.description.trim() === ''
        ) {
            return;
        }

        await addNewContext(contextFormData);
        onSaved();
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
