import React from 'react';

interface SelectionBoxProps {
    label: string;
    options: string[];
    onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectionBox: React.FC<SelectionBoxProps> = ({
    label,
    options,
    onSelectionChange,
}) => {
    return (
        <div className="flex flex-col gap-y-[10px]">
            <label className="text-base font-medium text-gray-800">
                {label}
            </label>
            <select
                className="input-box"
                onChange={onSelectionChange}
            >
                {options.map((option) => (
                    <option
                        className="text-base"
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectionBox;
