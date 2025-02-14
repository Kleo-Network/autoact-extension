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
                    className={`px-4 py-2 text-base rounded-full transition-all delay-75 duration-150 ease-linear ${
                        selectedOption === option
                            ? 'bg-blue-600 text-white font-semibold border border-blue-600 hover:cursor-default'
                            : 'bg-[#fafafa] text-black font-medium hover:text-blue-600 hover:cursor-pointer'
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
