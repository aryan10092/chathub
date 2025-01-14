
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
import './index.css';
import App from './App.jsx';
import React from 'react';

 import { UserProvider } from './context/Userprovider.jsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { Chatprovider } from './context/Chatprovide.jsx';
import { BrowserRouter } from 'react-router-dom';
export const server = "https://chathub-2.onrender.com";
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif",
    allVariants: { color: "white" },
  },
});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <Chatprovider>
    <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
      </Chatprovider>
    </UserProvider>
    </BrowserRouter>
  </StrictMode>
);

