import React from 'react';

interface PillsProps {
    options: string[];
    selectedOption: string;
    onSelectionChange: (option: string) => void;
}

const Pills: React.FC<PillsProps> = ({
    options,
    selectedOption,
    onSelectionChange,
}) => {
    return (
        <div className="flex space-x-3">
            {options.map((option) => (
                <button
                    key={option}
                    className={`px-4 py-2 font-semibold text-base rounded-full transition-all duration-200 ease-linear ${
                        selectedOption === option
                            ? 'bg-blue-600 text-white border border-blue-600 hover:cursor-default'
                            : 'bg-[#fafafa] text-black hover:text-blue-600 hover:cursor-pointer'
                    }`}
                    onClick={() => onSelectionChange(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
};

export default Pills;
