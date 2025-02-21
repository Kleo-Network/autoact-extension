import React, { useContext, useEffect, useState } from 'react';
import { MAX_CHARACTER_LIMIT } from '../constants/common.constants';
import { ContextsContext } from '../contexts/ContextsContext';
import { ContextFormValues } from '../models/context.model';

interface ContextFormProps {
    context: ContextFormValues;
    onChange: (name: keyof ContextFormValues, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isEditForm?: boolean;
}

const ContextForm: React.FC<ContextFormProps> = ({
    context,
    onChange,
    onSave,
    onCancel,
    isEditForm,
}) => {
    const { charactersCount } = useContext(ContextsContext),
        [previousCharactersCount, setPreviousCharactersCount] = useState(0),
        [currentCharactersCount, setCurrentCharactersCount] = useState(0),
        [isCharactersCountAdjusted, setIsCharactersCountAdjusted] =
            useState(false),
        [isCharactersLimitExceeded, setIsCharactersLimitExceeded] =
            useState(false),
        [isInvalidContextDetails, setIsInvalidContextDetails] = useState(false);

    useEffect(() => {
        if (isEditForm && !isCharactersCountAdjusted) {
            setPreviousCharactersCount(
                charactersCount -
                    context.title.length -
                    context.description.length,
            );
            setIsCharactersCountAdjusted(true);
        } else if (!isEditForm) {
            setPreviousCharactersCount(charactersCount);
            setIsCharactersCountAdjusted(false);
        }
    }, [charactersCount, context.title, context.description, isEditForm]);

    useEffect(() => {
        const newCharactersCount =
                previousCharactersCount +
                context.title.length +
                context.description.length,
            isLimitExceed = MAX_CHARACTER_LIMIT - newCharactersCount < 0;

        if (!isLimitExceed) setCurrentCharactersCount(newCharactersCount);

        setIsInvalidContextDetails(
            context.title.trim().length === 0 ||
                context.description.trim().length === 0,
        );
        setIsCharactersLimitExceeded(isLimitExceed);
    }, [previousCharactersCount, context.title, context.description]);

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
            <p
                className={`text-sm font-medium ${isCharactersLimitExceeded ? 'text-red-600' : ''}`}
            >
                {isCharactersLimitExceeded
                    ? `You've exceeded limit of ${MAX_CHARACTER_LIMIT.toLocaleString()} characters`
                    : `${currentCharactersCount.toLocaleString()} / ${MAX_CHARACTER_LIMIT.toLocaleString()} characters`}
            </p>
            <div className="btn-group flex justify-end gap-x-3">
                <button
                    className={
                        isCharactersLimitExceeded || isInvalidContextDetails
                            ? 'btn-primary-disabled'
                            : 'btn-primary'
                    }
                    onClick={onSave}
                    disabled={
                        isCharactersLimitExceeded || isInvalidContextDetails
                    }
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

export default ContextForm;
