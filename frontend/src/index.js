import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// Hide splash screen after React is ready
setTimeout(() => {
  const splashScreen = document.getElementById('splash-screen');
  if (splashScreen) {
    splashScreen.style.opacity = '0';
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 500);
  }
}, 2000);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);