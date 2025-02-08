// content/index.ts
import React from 'react';
import { createRoot } from 'react-dom/client';
import SideToolbar from './content/SideToolbar';

const mountReactApp = () => {
  // Check if the container already exists
  const existingContainer = document.getElementById('my-extension-root');
  if (existingContainer) return;

  // Create container for React app
  const container = document.createElement('div');
  container.id = 'my-extension-root';
  
  // Add any necessary styles to position your component
  container.style.position = 'fixed';
  container.style.right = '0';
  container.style.top = '50%';
  container.style.transform = 'translateY(-50%)';
  container.style.zIndex = '9999';
  
  // Append to body
  document.body.appendChild(container);

  // Create root and render
  const root = createRoot(container);
  root.render(React.createElement(SideToolbar));
};

// Handle potential errors
const init = () => {
  try {
    mountReactApp();
  } catch (error) {
    console.error('Failed to mount React app:', error);
  }
};

// Execute when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Optional: Clean up on unload
window.addEventListener('unload', () => {
  const container = document.getElementById('my-extension-root');
  if (container) {
    document.body.removeChild(container);
  }
});