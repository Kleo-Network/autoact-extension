import { useEffect, useState } from 'react';
import {
    addNewContextToDB,
    getAllContextsFromDB,
    updateContextInDB,
} from '../db/utils';
import { ContextFormValues, ContextItem } from '../models/context.model';

export default function useContexts() {
    const [contexts, setContexts] = useState<ContextItem[]>([]),
        [isLoading, setIsLoading] = useState(false),
        [isSaving, setIsSaving] = useState(false),
        [error, setError] = useState<string | null>(null),
        [saveError, setSaveError] = useState<string | null>(null);

    const fetchContexts = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const fetchedContexts = await getAllContextsFromDB();
            setContexts(fetchedContexts);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('Error fetching contexts', error);
            setError('Error fetching contexts, please try again!');
        }
    };

    useEffect(() => {
        fetchContexts();
    }, []);

    const addNewContext = async (context: ContextFormValues) => {
        const newContext: ContextItem = {
            id: Date.now(),
            ...context,
        };
        setIsSaving(true);
        setSaveError(null);

        try {
            await addNewContextToDB(newContext);
            setContexts((prevContexts) => [...prevContexts, newContext]);
            setIsSaving(false);
        } catch (error) {
            setIsSaving(false);
            console.log('Error adding context', error);
            setSaveError('Error adding context, please try again!');
        }
    };

    const updateContext = async (updateContext: ContextItem) => {
        setIsSaving(true);
        setSaveError(null);

        try {
            await updateContextInDB(updateContext);
            setContexts((prevContexts) =>
                prevContexts.map((context) =>
                    context.id === updateContext.id ? updateContext : context,
                ),
            );
            setIsSaving(false);
        } catch (error) {
            setIsSaving(false);
            console.log('Error updating context', error);
            setSaveError('Error updating context, please try again!');
        }
    };

    return {
        contexts,
        isLoading,
        isSaving,
        error,
        saveError,
        addNewContext,
        updateContext,
    };
}
