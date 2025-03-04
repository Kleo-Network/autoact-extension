import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import ContentPage from './content/ContentPage';

const mountUI = () => {
    if (document.getElementById('__autoact_container')) return;

    const shadowHost = document.createElement('div');
    shadowHost.id = '__autoact_container';
    document.body.appendChild(shadowHost);

    const shadowRoot = shadowHost.attachShadow({ mode: 'open' });

    const style = document.createElement('link');
    style.rel = 'stylesheet';

    style.href = chrome.runtime.getURL('contentScript.css');
    shadowRoot.appendChild(style);

    const app = document.createElement('div');
    shadowRoot.appendChild(app);

    createRoot(app).render(createElement(ContentPage));
};

mountUI();
