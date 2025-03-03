import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ContextsProvider } from './contexts/ContextsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextsProvider>
            <App />
        </ContextsProvider>
    </StrictMode>,
);
