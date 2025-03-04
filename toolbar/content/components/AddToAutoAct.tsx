import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { ButtonPosition } from '../../models/common.model';

interface AddToAutoActProps {
    buttonPosition: ButtonPosition;
    sendSelectedDataToSidebar: () => void;
}

const AddToAutoAct: React.FC<AddToAutoActProps> = ({
    buttonPosition,
    sendSelectedDataToSidebar,
}) => {
    return (
        <button
            id="btnAddToKnowledgebase"
            className="absolute z-50 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 py-2 px-3 flex items-center gap-x-1 font-medium transition-all delay-75 duration-100 ease-linear"
            style={{
                left: buttonPosition.x,
                top: buttonPosition.y + 4,
            }}
            onClick={sendSelectedDataToSidebar}
        >
            <BiPlus
                size={14}
                color="white"
            />
            <span>Add to AutoAct</span>
        </button>
    );
};

export default AddToAutoAct;
