import React from 'react';
import { BiSolidCog, BiSolidMagicWand } from 'react-icons/bi';

const ContentPage: React.FC = () => {
    return (
        <div>
            <div className="buttons-wrapper fixed top-1/2 right-0 flex flex-col bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg z-50 text-3xl">
                <button className="p-1 hover:bg-blue-500">
                    <BiSolidMagicWand
                        color="white"
                        size={30}
                    />
                </button>
                <button className="p-1 mt-1 hover:bg-blue-500">
                    <BiSolidCog
                        color="white"
                        size={30}
                    />
                </button>
            </div>
        </div>
    );
};

export default ContentPage;
