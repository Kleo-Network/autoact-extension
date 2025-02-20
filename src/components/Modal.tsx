import React, { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { ContextItem } from '../models/context.model';
import SelectionBox from './SelectionBox';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    contexts: ContextItem[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, contexts }) => {
    const [prompt, setPrompt] = useState(''),
        [selectedContext, setSelectedContext] = useState('');

    const handleRunScript = () => {
        console.log('Selected Context:', selectedContext);
        console.log('Additional Info:', prompt);
    };

    useEffect(() => {
        setSelectedContext(contexts.length ? contexts[0].title : '');
    }, [contexts]);

    if (!isOpen) return null;

    return (
        <div
            className="modal fixed inset-0 backdrop-blur-sm w-full h-full bg-black bg-opacity-50 z-[1000] flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg w-full max-w-screen-sm flex flex-col gap-y-[18px] p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-full flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-black">
                        Run Action
                    </h1>
                    <button
                        className="icon-btn"
                        onClick={onClose}
                    >
                        <BiX
                            color="gray"
                            size={24}
                        />
                    </button>
                </div>
                <SelectionBox
                    label="Select context from knowledgebase:"
                    options={contexts.map((context) => context.title)}
                    onSelectionChange={(event) =>
                        setSelectedContext(event.target.value)
                    }
                />
                <div className="flex flex-col gap-y-[10px]">
                    <label
                        htmlFor="additionalDetails"
                        className="text-base font-medium text-gray-800"
                    >
                        Add Additional Details:
                    </label>
                    <textarea
                        id="additionalDetails"
                        rows={2}
                        className="input-box"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                <button
                    className="btn-primary self-end px-6"
                    onClick={handleRunScript}
                >
                    Run Task
                </button>
            </div>
        </div>
    );
};

export default Modal;
