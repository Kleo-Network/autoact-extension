import { ContextItem } from '../models/context.model';
import { DB_NAME, DB_VERSION } from './constants';

const openDatabase = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('contexts')) {
                const objectStore = db.createObjectStore('contexts', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                objectStore.createIndex('title', 'title', { unique: false });
                objectStore.createIndex('description', 'description', {
                    unique: false,
                });
            }
        };

        request.onsuccess = (event: any) => resolve(event.target.result);
        request.onerror = () => reject(new Error('Error opening IndexedDB'));
    });
};

const addNewContextToDB = async (context: ContextItem) => {
    try {
        const db = await openDatabase(),
            transaction = db.transaction('contexts', 'readwrite'),
            objectStore = transaction.objectStore('contexts'),
            request = objectStore.add(context);

        return new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Error adding context'));
        });
    } catch (error) {
        console.log('Error opening IndexedDB', error);
        throw new Error('Error opening IndexedDB');
    }
};

const getAllContextsFromDB = async () => {
    try {
        const db = await openDatabase(),
            transaction = db.transaction('contexts', 'readonly'),
            objectStore = transaction.objectStore('contexts'),
            request = objectStore.getAll();

        return new Promise<ContextItem[]>((resolve, reject) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () =>
                reject(new Error('Error fetching contexts'));
        });
    } catch (error) {
        console.log('Error opening IndexedDB', error);
        throw new Error('Error opening IndexedDB');
    }
};

const updateContextInDB = async (updatedContext: ContextItem) => {
    try {
        const db = await openDatabase(),
            transaction = db.transaction('contexts', 'readwrite'),
            objectStore = transaction.objectStore('contexts'),
            request = objectStore.put(updatedContext);

        return new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Error updating context'));
        });
    } catch (error) {
        console.log('Error opening IndexedDB', error);
        throw new Error('Error opening IndexedDB');
    }
};

const deleteContextFromDB = async (contextId: number) => {
    try {
        const db = await openDatabase(),
            transaction = db.transaction('contexts', 'readwrite'),
            objectStore = transaction.objectStore('contexts'),
            request = objectStore.delete(contextId);

        return new Promise<void>((resolve, reject) => {
            request.onsuccess = () => resolve();
            request.onerror = () => reject(new Error('Error deleting context'));
        });
    } catch (error) {
        console.log('Error opening IndexedDB', error);
        throw new Error('Error opening IndexedDB');
    }
};

export {
    addNewContextToDB,
    deleteContextFromDB,
    getAllContextsFromDB,
    updateContextInDB,
};
