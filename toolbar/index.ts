import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import ContentPage from './content/ContentPage';
import './index.css';

const root = document.createElement('div');
root.id = '__autoact_container';
document.body.append(root);

createRoot(root).render(createElement(ContentPage));
