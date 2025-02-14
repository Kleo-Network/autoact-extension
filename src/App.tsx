import React, { useContext, useEffect } from 'react';
import { BiArrowBack, BiPlus, BiSolidPencil } from 'react-icons/bi';
import AddContextForm from './components/AddContextForm';
import ContextDetail from './components/ContextDetail';
import ContextList from './components/ContextList';
import { ContextsContext } from './contexts/ContextsContext';
import { ContextFormValues, ContextItem } from './models/context.model';

const App: React.FC = () => {
    const { contexts: contextItems } = useContext(ContextsContext),
        [currentContext, setCurrentContext] =
            React.useState<ContextItem | null>(null),
        [isEditMode, setIsEditMode] = React.useState(false),
        [sidebarContentType, setSidebarContentType] = React.useState<
            'contexts' | 'addNewContext'
        >('contexts');

    useEffect(() => {
        chrome.runtime.sendMessage(
            { action: 'getSidebarState' },
            (
                response:
                    | { contentType: 'contexts' | 'addNewContext' }
                    | undefined,
            ) => {
                if (response) {
                    setSidebarContentType(response.contentType);
                }
            },
        );

        const handleMessage = (message: {
            action: string;
            contentType?: 'contexts' | 'addNewContext';
        }) => {
            if (
                message.action === 'updateSidebarContentType' &&
                message.contentType
            ) {
                setSidebarContentType(message.contentType);
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);

        return () => {
            chrome.runtime.onMessage.removeListener(handleMessage);
        };
    }, []);

    const handleViewContext = (item: ContextItem) => {
        setCurrentContext(item);
        setIsEditMode(false);
    };

    const handleCancel = () => setIsEditMode(false);

    const handleSave = (updateContext: ContextFormValues) => {
        setCurrentContext((prevContext) => {
            if (!prevContext) return null;
            return {
                ...prevContext,
                ...updateContext,
            };
        });
        setIsEditMode(false);
    };

    const addNewContext = () => {
        chrome.runtime.sendMessage({
            action: 'scrappedPageData',
            pageData: {
                title: '',
                description: '',
            },
        });
        chrome.runtime.sendMessage({
            action: 'openSidePanel',
            contentType: 'addNewContext',
        });
        setSidebarContentType('addNewContext');
    };

    return sidebarContentType === 'contexts' ? (
        <div className="text-base flex flex-col h-screen overflow-hidden">
            <div className="w-full px-6 py-[14px] bg-[#EDF0F9] flex items-center justify-between">
                {!currentContext && (
                    <h1 className="text-lg font-semibold">
                        Your Knowledgebase
                    </h1>
                )}
                {!currentContext && !isEditMode && (
                    <button
                        className="btn-primary flex items-center justify-center gap-x-1"
                        onClick={addNewContext}
                    >
                        <BiPlus
                            size={18}
                            color="white"
                        />
                        <span>New</span>
                    </button>
                )}
                {currentContext && (
                    <button
                        className="transition-all duration-150 delay-75 ease-linear text-black flex items-center gap-x-2 hover:text-blue-600"
                        onClick={() => {
                            setCurrentContext(null);
                            setIsEditMode(false);
                        }}
                    >
                        <BiArrowBack size={18} />
                        <span>Back to Knowledgebase</span>
                    </button>
                )}
                {currentContext && !isEditMode && (
                    <button
                        className="icon-btn hover:bg-white"
                        onClick={() => setIsEditMode(true)}
                    >
                        <BiSolidPencil
                            size={18}
                            color="black"
                        />
                    </button>
                )}
            </div>
            {currentContext && (
                <ContextDetail
                    context={currentContext}
                    isEditMode={isEditMode}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            {!currentContext && (
                <ContextList
                    contextItems={contextItems}
                    onView={handleViewContext}
                />
            )}
        </div>
    ) : (
        <AddContextForm
            onSaved={() => {
                chrome.runtime.sendMessage({
                    action: 'openSidePanel',
                    contentType: 'contexts',
                });
                setSidebarContentType('contexts');
                setCurrentContext(null);
            }}
        />
    );
};

export default App;
