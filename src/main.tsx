import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import BonusPage from './components/BonusPage.tsx';
import './index.css';

const isBonusPath = window.location.pathname.startsWith('/meus-bonus');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isBonusPath ? <BonusPage /> : <App />}
  </StrictMode>
);
