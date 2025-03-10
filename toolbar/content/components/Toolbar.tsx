import React from 'react';
import { BiData, BiPlay, BiSolidMagicWand } from 'react-icons/bi';
import { TOOLBAR_ID } from '../../constants/common.constants';
import { ContextItem } from '../../models/context.model';

interface ToolbarProps {
    contexts: ContextItem[];
    openSidebar: (
        contentType: 'contexts' | 'addNewContext',
        notifySidePanel?: boolean,
    ) => void;
    removeSelection: () => void;
    openModal: () => void;
    onMagicWandClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    contexts,
    openSidebar,
    removeSelection,
    openModal,
    onMagicWandClick
}) => {

    const handleKnowledgebaseButtonClick = () => {
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
        <div
            id={TOOLBAR_ID}
            className="buttons-wrapper fixed top-[42%] right-0 flex flex-col gap-y-1 bg-blue-600 w-fit p-1 rounded-tl-lg rounded-bl-lg"
            style={{
                zIndex: 9999,
            }}
        >
            <button
                className="toolbar-btn"
                title="Magic Form Filler"
                onClick={onMagicWandClick}
            >
                <BiSolidMagicWand
                    color="white"
                    size={30}
                />
            </button>
            <button
                className={`toolbar-btn ${contexts.length === 0 ? 'hover:bg-blue-600' : ''}`}
                onClick={() => {
                    openModal();
                    removeSelection();
                }}
                disabled={contexts.length === 0}
                title="Run"
            >
                <BiPlay
                    color={contexts.length === 0 ? '#ffffff3b' : 'white'}
                    size={30}
                />
            </button>
            <button
                className="toolbar-btn"
                onClick={handleKnowledgebaseButtonClick}
                title="Knowledgebase"
            >
                <BiData
                    color="white"
                    size={30}
                />
            </button>
        </div>
    );
};

export default Toolbar;