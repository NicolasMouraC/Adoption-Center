import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './app/global/GlobalStyles';
import reportWebVitals from './reportWebVitals';
import AppRoutes from './app/routes';
import { AnimalsProvider } from './app/context/AnimalsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AnimalsProvider>
    <GlobalStyle />
    <AppRoutes />
  </AnimalsProvider>
);

reportWebVitals();
