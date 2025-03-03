import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const mountUI = () => {
    if (document.getElementById('__autoact_container')) return;

    const shadowHost = document.createElement('div');
    shadowHost.id = '__autoact_container';
    document.body.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: 'open' }),
        style = document.createElement('link');

    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('index.css');
    shadowRoot.appendChild(style);

    const app = document.createElement('div');
    shadowRoot.appendChild(app);

    import('./content/content-page').then(({ default: ContentPage }) => {
        createRoot(app).render(
            <StrictMode>
                <ContentPage />
            </StrictMode>,
        );
    });
};

mountUI();
