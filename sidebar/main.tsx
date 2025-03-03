import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../public/index.css';
import { ContextsProvider } from '../src/contexts/ContextsContext';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextsProvider>
            <App />
        </ContextsProvider>
    </StrictMode>,
);
