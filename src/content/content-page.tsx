import React, { useEffect, useState } from 'react';
import { BiData, BiPlay, BiPlus, BiSolidMagicWand } from 'react-icons/bi';
import Modal from '../components/Modal';
import { ContextFormValues } from '../models/context.model';

interface ButtonPosition {
    x: number;
    y: number;
}

const ContentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false),
        [showAddButton, setShowAddButton] = useState(false),
        [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
            x: 0,
            y: 0,
        }),
        [pageData, setPageData] = useState<ContextFormValues>({
            title: '',
            description: '',
        });

    const handleMouseUp = () => {
        const selection = window.getSelection(),
            selectedText = selection?.toString().trim() || '';

        if (selectedText?.length !== 0 && selection?.rangeCount) {
            setShowAddButton(false);
            setPageData({
                title: document.title,
                description: selectedText,
            });

            const range = selection.getRangeAt(0),
                rect = range.getBoundingClientRect();
            setButtonPosition({
                x: rect.left + window.scrollX,
                y: rect.bottom + window.scrollY,
            });

            setShowAddButton(true);
        }
    };

    const handleMouseDown = (event: MouseEvent) => {
        const element = event.composedPath()[0] as HTMLElement;
        console.log(element);

        if (
            element.id === 'btnAddToKnowledgebase' ||
            element.closest('#btnAddToKnowledgebase')
        )
            return;

        setShowAddButton(false);
    };

    const handleClick = () => {
        setTimeout(() => {
            const selection = window.getSelection()?.toString().trim();
            if (!selection) setShowAddButton(false);
        }, 0);
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    const removeSelection = () => {
        document.getSelection()?.removeAllRanges();
        setShowAddButton(false);
    };

    const openSidebar = (
        contentType: 'contexts' | 'addNewContext',
        notifySidePanel = false,
    ) => {
        chrome.runtime.sendMessage({
            action: 'openSidePanel',
            contentType,
            notifySidePanel,
        });
    };

    const sendPageData = () => {
        removeSelection();
        chrome.runtime.sendMessage({
            action: 'scrappedPageData',
            pageData,
        });
        openSidebar('addNewContext', true);
    };

    const handleKnowledgebaseClick = () => {
        chrome.runtime.sendMessage(
            { action: 'getSidebarState' },
            (
                response:
                    | {
                          contentType: 'contexts' | 'addNewContext';
                          isSidePanelOpen: boolean;
                      }
                    | undefined,
            ) => {
                if (response && response.isSidePanelOpen) {
                    if (response.contentType === 'addNewContext')
                        openSidebar('contexts', true);
                    else {
                        chrome.runtime.sendMessage({
                            action: 'closeSidePanel',
                        });
                    }
                } else {
                    openSidebar('contexts', true);
                }
            },
        );
        removeSelection();
    };

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            {showAddButton && (
                <button
                    id="btnAddToKnowledgebase"
                    className="absolute z-50 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 py-2 px-3 flex items-center gap-x-1 font-medium"
                    style={{
                        left: buttonPosition.x,
                        top: buttonPosition.y + 4,
                    }}
                    onClick={sendPageData}
                >
                    <BiPlus
                        size={14}
                        color="white"
                    />
                    <span>Add to AutoAct</span>
                </button>
            )}
            <div className="buttons-wrapper fixed top-[42%] right-0 flex flex-col bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg z-50">
                <button
                    className="p-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                    title="Magic"
                >
                    <BiSolidMagicWand
                        color="white"
                        size={30}
                    />
                </button>
                <button
                    className="p-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                    onClick={() => {
                        setIsModalOpen(true);
                        removeSelection();
                    }}
                    title="Run"
                >
                    <BiPlay
                        color="white"
                        size={30}
                    />
                </button>
                <button
                    className="p-1 mt-1 rounded-md transition-colors duration-100 ease-linear hover:bg-blue-800"
                    onClick={handleKnowledgebaseClick}
                    title="Knowledgebase"
                >
                    <BiData
                        color="white"
                        size={30}
                    />
                </button>
            </div>
        </div>
    );
};

export default ContentPage;
