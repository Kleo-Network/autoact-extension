import React from 'react';
import { BiData, BiPlus, BiSolidMagicWand } from 'react-icons/bi';
import Modal from '../components/Modal';

const ContentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const sendPageData = () => {
        chrome.runtime.sendMessage({
            action: 'scrappedPageData',
            pageData: {
                title: document.title,
                description: document.body.innerText,
            },
        });
    };

    React.useEffect(() => {
        sendPageData();

        document.addEventListener('visibilitychange', () => {
            sendPageData();
        });

        return () => {
            document.removeEventListener('visibilitychange', () => {
                sendPageData();
            });
        };
    }, []);

    const openSidebar = (contentType: 'contexts' | 'addNewContext') => {
        chrome.runtime.sendMessage({ action: 'openSidePanel', contentType });
    };

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className="buttons-wrapper fixed top-1/2 right-0 flex flex-col bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg z-50">
                <button
                    className="p-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                    onClick={() => setIsModalOpen(true)}
                >
                    <BiSolidMagicWand
                        color="white"
                        size={30}
                    />
                </button>
                <button
                    className="p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                    onClick={() => openSidebar('contexts')}
                >
                    <BiData
                        color="white"
                        size={30}
                    />
                </button>
                <button className="p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800">
                    <BiPlus
                        color="white"
                        size={30}
                        onClick={() => openSidebar('addNewContext')}
                    />
                </button>
            </div>
        </div>
    );
};

export default ContentPage;
