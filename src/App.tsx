import React, { useContext, useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
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
            { action: 'getSidebarContentType' },
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

    return sidebarContentType === 'contexts' ? (
        <div className="text-base">
            {currentContext && (
                <div>
                    <div className="w-full p-4 border-b border-gray-200">
                        <button
                            className="rounded-full p-1 transition-colors duration-100 ease-linear hover:bg-slate-200"
                            onClick={() => {
                                setCurrentContext(null);
                                setIsEditMode(false);
                            }}
                        >
                            <BiArrowBack size={18} />
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
        </div>
    ) : (
        <AddContextForm
            onSaved={() => {
                setSidebarContentType('contexts');
                setCurrentContext(null);
            }}
        />
    );
};

export default App;
