import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Rechargement automatique fluide si un chunk dynamique a changé suite à une nouvelle mise en ligne
window.addEventListener('vite:preloadError', () => {
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
