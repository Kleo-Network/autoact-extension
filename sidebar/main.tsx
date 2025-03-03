import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextsProvider } from '../src/contexts/ContextsContext';
import '../src/index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextsProvider>
            <App />
        </ContextsProvider>
    </StrictMode>,
);
