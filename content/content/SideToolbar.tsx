import React from 'react';
import { BiData, BiPlus, BiSolidMagicWand } from 'react-icons/bi';

const SideToolbar: React.FC = () => {

    return (
        <div>
            
            <div className="buttons-wrapper fixed top-1/2 right-0 flex flex-col bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg z-50">
                <button
                    className="p-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                   
                >
                    <BiSolidMagicWand
                        color="white"
                        size={30}
                    />
                </button>
                <button className="p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800">
                    <BiData
                        color="white"
                        size={30}
                    />
                </button>
                <button className="p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800">
                    <BiPlus
                        color="white"
                        size={30}
                    />
                </button>
            </div>
        </div>
    );
};

export default SideToolbar;
