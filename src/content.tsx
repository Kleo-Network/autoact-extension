import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ContentPage from './content/content-page';

const root = document.createElement('div');
root.id = '__autoact_container';
document.body.append(root);

createRoot(root).render(
    <StrictMode>
        <ContentPage />
    </StrictMode>,
);
