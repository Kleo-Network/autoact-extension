import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {/* <ContextsProvider> */}
        {/* <App /> */}
        <h1>Hello World</h1>
        {/* </ContextsProvider> */}
    </StrictMode>,
);
