import React, { useContext, useEffect } from 'react';
import { BiArrowBack, BiPlus } from 'react-icons/bi';
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
        <div className="text-base">
            {currentContext && (
                <div>
                    <div className="w-full p-4 border-b border-gray-200">
                        <button
                            className="rounded-lg py-2 px-3 transition-colors duration-100 ease-linear flex items-center gap-x-2 bg-slate-200 hover:text-blue-600"
                            onClick={() => {
                                setCurrentContext(null);
                                setIsEditMode(false);
                            }}
                        >
                            <BiArrowBack size={18} />
                            <span>Back to Knowledgebase</span>
                        </button>
                    </div>

                    <ContextDetail
                        context={currentContext}
                        isEditMode={isEditMode}
                        onEdit={() => setIsEditMode(true)}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                </div>
            )}
            {!currentContext && (
                <ContextList
                    contextItems={contextItems}
                    onView={handleViewContext}
                />
            )}
            {!isEditMode && (
                <button
                    className="fixed right-4 bottom-4 z-50 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 py-2 px-4 flex items-center justify-center gap-x-1 font-medium"
                    onClick={addNewContext}
                >
                    <BiPlus
                        size={18}
                        color="white"
                    />
                    <span>New</span>
                </button>
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
