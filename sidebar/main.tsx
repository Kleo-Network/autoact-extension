import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/index.css';
import App from './App';
import { ContextsProvider } from './contexts/ContextsContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextsProvider>
            <App />
        </ContextsProvider>
    </StrictMode>,
);
