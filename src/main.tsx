import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import '@gravity-ui/uikit/styles/styles.css';
import './app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider/index.ts';
import { ThemeProvider } from '@gravity-ui/uikit';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>
);
