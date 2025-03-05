import React, { useEffect, useState } from 'react';
import { ButtonPosition } from '../models/common.model';
import { ContextFormValues, ContextItem } from '../models/context.model';
import { formFillerService } from '../services/formFiller';
import AddToAutoAct from './components/AddToAutoAct';
import Modal from './components/Modal';
import Toolbar from './components/Toolbar';

// Configuration settings for API URL - you might want to move this to a config file
const API_BASE_URL = 'http://localhost:8000/api/v1/form';

const ContentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);
    const [buttonPosition, setButtonPosition] = useState<ButtonPosition>({
        x: 0,
        y: 0,
    });
    const [pageData, setPageData] = useState<ContextFormValues>({
        title: '',
        description: '',
    });
    const [contexts, setContexts] = useState<ContextItem[]>([]);

    // Initialize the form filler service when the component mounts
    useEffect(() => {
        formFillerService.setApiUrl(API_BASE_URL);
    }, []);

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

    const fetchContexts = () => {
        chrome.runtime.sendMessage(
            { action: 'getContexts' },
            (response: { data: ContextItem[]; error: string | null }) => {
                if (response && !response.error) {
                    setContexts(response.data);
                }
            },
        );
    };

    const handleRefetchContexts = (message: { action: string }) => {
        if (message.action === 'refetchContexts') fetchContexts();
    };

    useEffect(() => {
        fetchContexts();
        chrome.runtime.onMessage.addListener(handleRefetchContexts);

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('click', handleClick);

        return () => {
            chrome.runtime.onMessage.removeListener(handleRefetchContexts);

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

    const sendSelectedDataToSidebar = () => {
        removeSelection();
        chrome.runtime.sendMessage({
            action: 'scrappedPageData',
            pageData,
        });
        openSidebar('addNewContext', true);
    };

    const handleMagicWandClick = async () => {
        removeSelection();
        await formFillerService.autoFillForm(contexts);
    };

    return (
        <div className="font-inter">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                contexts={contexts}
            />
            
            {showAddButton && (
                <AddToAutoAct
                    buttonPosition={buttonPosition}
                    sendSelectedDataToSidebar={sendSelectedDataToSidebar}
                />
            )}
            
            <Toolbar
                contexts={contexts}
                openSidebar={openSidebar}
                removeSelection={removeSelection}
                openModal={() => setIsModalOpen(true)}
                onMagicWandClick={handleMagicWandClick}
            />
        </div>
    );
};

export default ContentPage;