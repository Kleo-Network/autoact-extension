import React, { useEffect } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import AddContextForm from './components/AddContextForm';
import ContextDetail from './components/ContextDetail';
import ContextList from './components/ContextList';
import { ContextItem } from './models/context.model';

const App: React.FC = () => {
    const contextItems: ContextItem[] = [
        {
            id: 1,
            title: 'My Projects',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam elit magna, vitae laoreet enim maximus et. Suspendisse eget justo.',
        },
        {
            id: 2,
            title: 'Flight Info',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam elit magna, vitae laoreet enim maximus et. Suspendisse eget justo.',
        },
        {
            id: 3,
            title: 'Bank Statements',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam elit magna, vitae laoreet enim maximus et. Suspendisse eget justo.',
        },
        {
            id: 4,
            title: 'My Orders',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquam elit magna, vitae laoreet enim maximus et. Suspendisse eget justo.',
        },
    ];

    const [currentContext, setCurrentContext] =
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

    const handleSave = () => {
        setIsEditMode(false);
    };

    if (sidebarContentType === 'addNewContext') {
        return <AddContextForm />;
    }

    return (
        <div className="text-base">
            {currentContext && (
                <div className="">
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
    );
};

export default App;
